import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useEffect, useRef, useState } from "react";
import forge from "node-forge";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import "./CertificateContent.css";

import {
  postCertificates,
  TCertificates,
} from "../../../../API/PostCertificates";
import { getCertificates } from "../../../../API/GetCertificates";
import { queryClient } from "../../../../../queryClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const CertificateContent = () => {
  const [certificateData, setCertificateData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const postCertificateMutation = useMutation({
    mutationFn: (data: TCertificates) => postCertificates(data, requestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
    },
  });

  const location = useLocation();
  const requestIdTemp = location.pathname.split("/");
  const requestId = parseInt(requestIdTemp[requestIdTemp.length - 1]);

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

          const newData = {
            requestId: requestId,
            typeToken: "EToken",
            serialNumber: cert.serialNumber,
            validFrom,
            validTo,
            fullName: formattedSubject.commonName,
            organization: formattedSubject.organizationName,
            role: formattedSubject.title,
          };

          setCertificateData(newData);
          postCertificateMutation.mutate(newData);
        } catch (error) {
          console.error("Ошибка при обработке сертификата:", error);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const getCertificateQuery = useQuery({
    queryFn: () => getCertificates(),
    queryKey: ["certificates"],
  });

  const [certificatesTemp, setCertificatesTemp] = useState<TCertificates[]>([]);

  useEffect(() => {
    if (getCertificateQuery.status === "success") {
      setCertificatesTemp(getCertificateQuery.data);
    }
  }, [getCertificateQuery]);

  const currentCertificate = certificatesTemp[certificatesTemp.length - 1];

  console.log(currentCertificate);

  return (
    <div className="certificate-content">
      <div className="panel-control-service">
        <Button
          variant="text"
          className="add-services"
          onClick={() => fileInputRef.current?.click()}
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
      {currentCertificate && (
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
              <td>{currentCertificate?.typeToken}</td>
              <td>{currentCertificate?.serialNumber}</td>
              <td>{currentCertificate?.validFrom}</td>
              <td>{currentCertificate?.validTo}</td>
              <td>{currentCertificate?.fullName}</td>
              <td>{currentCertificate?.organization}</td>
              <td>{currentCertificate?.role}</td>
              <td>
                <FileDownloadOutlinedIcon />
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CertificateContent;
