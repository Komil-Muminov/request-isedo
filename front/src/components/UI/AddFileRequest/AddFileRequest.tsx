import React from "react";
import "./AddFileRequest.css";

const AddFileRequest = () => {
  return (
    <div className="file-input-wrapper">
      <input id="file-input" type="file" />
      <label htmlFor="file-input" className="custom-file-label">
        <span className="custom-file-input"></span>
        <span className="file-input-text">Выберите файл</span>
      </label>
    </div>
  );
};

export default AddFileRequest;
