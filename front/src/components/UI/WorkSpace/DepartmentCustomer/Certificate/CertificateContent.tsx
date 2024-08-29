import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useState } from "react";
import forge from "node-forge";

const CertificateContent = () => {
  const [certificateData, setCertificateData] = useState<any>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const fileContent = e.target?.result as string;

        try {
          let certAsn1;
          // Check if the file content is PEM or DER
          if (fileContent.startsWith("-----BEGIN CERTIFICATE-----")) {
            // PEM format
            const pem = fileContent;
            certAsn1 = forge.asn1.fromDer(
              forge.util.decode64(
                pem.replace(/-----.*-----/g, "").replace(/\s+/g, "")
              )
            );
          } else {
            // DER format
            const der = forge.util
              .createBuffer(fileContent, "binary")
              .getBytes();
            certAsn1 = forge.asn1.fromDer(der);
          }

          // Извлечение сертификата из ASN.1
          const cert = forge.pki.certificateFromAsn1(certAsn1);

          // Извлечение данных из сертификата
          const subjectAttributes = cert.subject.attributes;
          const issuerAttributes = cert.issuer.attributes;

          const formattedSubject = subjectAttributes.reduce(
            (acc: any, attr: any) => {
              acc[attr.name] = attr.value;
              return acc;
            },
            {}
          );

          const formattedIssuer = issuerAttributes.reduce(
            (acc: any, attr: any) => {
              acc[attr.name] = attr.value;
              return acc;
            },
            {}
          );

          // Объединение данных
          setCertificateData({
            subject: formattedSubject,
            issuer: formattedIssuer,
            serialNumber: cert.serialNumber,
          });
        } catch (error) {
          console.error("Ошибка при обработке сертификата:", error);
        }
      };
      // Read the file as binary string for DER or text for PEM
      reader.readAsBinaryString(file);
    }
  };

  return (
    <div className="certificate-content">
      <div className="panel-control-service">
        <Button variant="text" className="add-services">
          <AddCircleIcon />
          <p>Сертификат</p>
        </Button>
      </div>
      <input
        style={{ padding: "20px" }}
        type="file"
        accept=".pem,.crt,.cer"
        onChange={handleFileChange}
      />
      {certificateData && (
        <div style={{ padding: "20px" }}>
          <h3>Данные сертификата:</h3>
          <h4>Субъект:</h4>
          <pre>{JSON.stringify(certificateData.subject, null, 2)}</pre>
          <h4>Выдавший:</h4>
          <pre>{JSON.stringify(certificateData.issuer, null, 2)}</pre>
          <h4>Серийный номер:</h4>
          <p>{certificateData.serialNumber}</p>
        </div>
      )}
    </div>
  );
};

export default CertificateContent;
