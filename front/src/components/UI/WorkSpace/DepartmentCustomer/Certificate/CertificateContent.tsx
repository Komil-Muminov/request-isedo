import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useRef, useState } from "react";
import forge from "node-forge";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "./CertificateContent.css";

const CertificateContent = () => {
  const [certificateData, setCertificateData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target?.result as string;

        try {
          let certAsn1;
          if (fileContent.startsWith("-----BEGIN CERTIFICATE-----")) {
            const pem = fileContent;
            certAsn1 = forge.asn1.fromDer(
              forge.util.decode64(
                pem.replace(/-----.*-----/g, "").replace(/\s+/g, "")
              )
            );
          } else {
            const der = forge.util
              .createBuffer(fileContent, "binary")
              .getBytes();
            certAsn1 = forge.asn1.fromDer(der);
          }

          const cert = forge.pki.certificateFromAsn1(certAsn1);

          // Convert certificate attributes to a more readable format
          const formatAttributes = (attributes: any[]) => {
            return attributes.reduce((acc: any, attr: any) => {
              const name = attr.name;
              let value = attr.value;

              // Decode byte strings if needed
              if (typeof value === "string" && value.match(/^[\x00-\x7F]+$/)) {
                acc[name] = value;
              } else if (typeof value === "string") {
                acc[name] = forge.util.decodeUtf8(value);
              } else {
                acc[name] = value;
              }

              return acc;
            }, {});
          };

          const formattedSubject = formatAttributes(cert.subject.attributes);
          const formattedIssuer = formatAttributes(cert.issuer.attributes);

          // Format validity dates
          const validFrom = cert.validity.notBefore.toISOString();
          const validTo = cert.validity.notAfter.toISOString();

          setCertificateData({
            subject: formattedSubject,
            issuer: formattedIssuer,
            serialNumber: cert.serialNumber,
            validFrom,
            validTo,
          });
        } catch (error) {
          console.error("Ошибка при обработке сертификата:", error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  console.log(certificateData);

  return (
    <div className="certificate-content">
      <div className="panel-control-service">
        <Button
          variant="text"
          className="add-services"
          onClick={handleButtonClick}
        >
          <AddCircleIcon />
          <p>Сертификат</p>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".pem,.crt,.cer"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <table className="table-certificate-list">
        <thead>
          <tr>
            <th>Тип токена</th>
            <th>Серийный номер</th>
            <th>Действителен с</th>
            <th>Действителен до</th>
            <th>ФИО</th>
            <th>Организация</th>
            <th>Должность</th>
            <th>Экспорт</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>EToken</td>
            <td>{certificateData?.serialNumber}</td>
            <td>{certificateData?.validFrom}</td>
            <td>{certificateData?.validTo}</td>
            <td>{certificateData?.subject.commonName}</td>
            <td>{certificateData?.subject.organizationName}</td>
            <td>{certificateData?.subject.title}</td>
            <td>
              <FileDownloadOutlinedIcon />
            </td>
          </tr>
        </tbody>
      </table>
      {/* {certificateData && (
        <div style={{ padding: "20px" }}>
          <h3>Данные сертификата:</h3>
          <h4>Субъект:</h4>
          <pre>{JSON.stringify(certificateData.subject, null, 2)}</pre>
          <h4>Выдавший:</h4>
          <pre>{JSON.stringify(certificateData.issuer, null, 2)}</pre>
          <h4>Серийный номер:</h4>
          <p>{certificateData.serialNumber}</p>
          <h4>Действителен с:</h4>
          <p>{certificateData.validFrom}</p>
          <h4>Действителен до:</h4>
          <p>{certificateData.validTo}</p>
        </div>
      )} */}
    </div>
  );
};

export default CertificateContent;
