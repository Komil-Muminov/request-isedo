import "./CardFileService.css";
import AddFileRequest from "../AddFileRequest/AddFileRequest";

const CardFileService = ({
  item,
  handleGetFile,
  getFile,
  size,
  rqstsDataById,

}: any) => {
  return (
    <div className={`${size ? size : "wrapper-file"}`}>
      <p className="title-file">{item?.name}</p>
      <div className="file-service">
        <AddFileRequest
          item={item}
          handleGetFile={handleGetFile}
          getFile={getFile}
          rqstsDataById={rqstsDataById}
        />
      </div>
    </div>
  );
};

export default CardFileService;
