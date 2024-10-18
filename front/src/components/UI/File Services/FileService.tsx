import "./FileService.css";

import fileserviceIcon from "../../../assets/fileservice.svg";

const FileService = ({ handleGetFile }: any) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleGetFile(file);
    console.log(file);

    // Сброс значения инпута после выбора файла
    event.target.value = "";
  };

  return (
    <div className="fileservice-content">
      <input
        onChange={handleChange}
        type="file"
        id="fileservice-input"
        className="fileservice-input"
      />
      <img src={fileserviceIcon} alt="" />
      {/* Используем label для интерактивности */}
      <label htmlFor="fileservice-input" className="fileservice-label">
        <p className="fileservice-title">
          Drag and Drop or <span>Click to upload</span>
        </p>
        <p className="fileservice-description">
          Supported formats: PDF or XLS. Max Size: 25MB
        </p>
      </label>
    </div>
  );
};

export default FileService;
