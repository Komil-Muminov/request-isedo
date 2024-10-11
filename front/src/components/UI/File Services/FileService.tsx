import "./FileService.css";

import fileserviceIcon from "../../../assets/fileservice.svg";

const FileService = () => {
  const handleFileUploadClick = () => {
    const fileInput = document.getElementById(
      "fileservice-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <>
      <div className="fileservice-content" onClick={handleFileUploadClick}>
        <input
          type="file"
          id="fileservice-input"
          className="fileservice-input"
        />
        <img src={fileserviceIcon} alt="" />
        <label htmlFor="fileservice-input">
          <p className="fileservice-title">
            Drag and Drop or <span>Click to upload</span>
          </p>
          <p className="fileservice-description">
            Supported formats: PDF or XLS. Max Size: 25MB
          </p>
        </label>
      </div>
    </>
  );
};

export default FileService;
