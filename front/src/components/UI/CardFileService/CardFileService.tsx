import "./CardFileService.css";
import AddFileRequest from "../AddFileRequest/AddFileRequest";

const CardFileService = ({ item, handleGetFile, getFile }: any) => {
  return (
    <div className="wrapper-file">
      <p className="title-file">{item?.name}</p>
      <div className="file-service">
        <AddFileRequest
          item={item}
          handleGetFile={handleGetFile}
          getFile={getFile}
        />
      </div>
    </div>
  );
};

export default CardFileService;
