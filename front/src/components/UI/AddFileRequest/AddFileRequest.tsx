import { useState } from "react";
import "./AddFileRequest.css";
import { TProps } from "../TableRow/TableRowRequestType";

const AddFileRequest = ({ item, handleGetFile, file }: TProps) => {
  const [fileName, setFileName] = useState("Выберите файл");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFileName(file ? file.name : "Выберите файл");
    handleGetFile(item?.id, file);
  };

  const choosenFileClass = file?.number === item?.id ? "activeFile" : "";

  return (
    <div className="file-input-wrapper">
      <input
        id={`file-input-${item?.id}`}
        type="file"
        onChange={handleChange}
      />
      <label htmlFor={`file-input-${item?.id}`} className="custom-file-label">
        <span className={`custom-file-input ${choosenFileClass}`}></span>
        <span className="file-input-text">{fileName}</span>
      </label>
    </div>
  );
};

export default AddFileRequest;
