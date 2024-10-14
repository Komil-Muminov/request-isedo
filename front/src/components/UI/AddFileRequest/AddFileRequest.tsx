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

    handleGetFile(item?.id, file);
  };

  const choosenFileClass = getFile?.number === item?.id ? "activeFile" : "";

  const firstFile =
    item?.name === "Карор дар бораи ба вазифа таъин намудани сармухосиб."
      ? rqstsDataById?.files[1]?.fileName
      : "";

  const secondFile =
    item?.name === "Нусхаи шиноснома (аз харду тараф)."
      ? rqstsDataById?.files[2]?.fileName
      : "";

  const currentFile = firstFile || secondFile;

  return (
    <div className="file-input-wrapper">
      <input
        id={`file-input-${item?.id}`}
        type="file"
        onChange={handleChange}
      />
      <label htmlFor={`file-input-${item?.id}`} className="custom-file-label">
        <span className={`custom-file-input ${choosenFileClass}`}></span>
        <span className="file-input-text">{currentFile || fileName}</span>
      </label>
    </div>
  );
};

export default AddFileRequest;
