import "./FileService.css";

const FileService = () => {
  return (
    <>
      <div className="fileservice-content">
        <input
          type="file"
          id="fileservice-input"
          className="fileservice-input"
        />
        <img src="" alt="" />
        <label htmlFor="fileservice-input">
          <p className="fileservice-title">
            Drag and Drop or <span>Click to upload</span>
          </p>
          <p className="fileservice-description">Supported formats: PDF or XLS. Max Size: 25MB</p>
        </label>
      </div>
    </>
  );
};

export default FileService;
