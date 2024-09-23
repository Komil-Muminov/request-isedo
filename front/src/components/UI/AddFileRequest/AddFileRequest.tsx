import { useState } from "react";
import "./AddFileRequest.css";
import { TProps } from "../TableRow/TableRowRequestType";

const AddFileRequest = ({
  item,
  handleGetFile,
  getFile,
  rqstsDataById,
}: TProps) => {
  const [fileName, setFileName] = useState("Выберите файл");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : "Выберите файл");

    const executorFile =
      item?.name === "Карор дар бораи аз вазифа озод намудани сармухосиб."
        ? 1
        : 2;

    handleGetFile(item?.id, file, executorFile);
  };

  const choosenFileClass = getFile?.number === item?.id ? "activeFile" : "";

  console.log(rqstsDataById);

  return (
    <div className="file-input-wrapper">
      <input
        id={`file-input-${item?.id}`}
        type="file"
        onChange={handleChange}
      />
      <label htmlFor={`file-input-${item?.id}`} className="custom-file-label">
        <span className={`custom-file-input ${choosenFileClass}`}></span>
        <span className="file-input-text">
          {rqstsDataById ? rqstsDataById?.files[0]?.fileName : fileName}
        </span>
      </label>
    </div>
  );
};

export default AddFileRequest;
