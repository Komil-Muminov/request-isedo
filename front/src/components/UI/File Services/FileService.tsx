import "./FileService.css";

import fileserviceIcon from "../../../assets/fileservice.svg";

const FileService = ({ handleGetFile }: any) => {
  const handleFileUploadClick = () => {
    const fileInput = document.getElementById(
      "fileservice-input"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleGetFile(file);

    console.log(file);
  };

  return (
    <>
      <div className="fileservice-content" onClick={handleFileUploadClick}>
        <input
          onChange={handleChange}
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
