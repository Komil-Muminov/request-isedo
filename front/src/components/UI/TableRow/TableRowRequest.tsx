import AddFileRequest from "../AddFileRequest/AddFileRequest";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TProps } from "./TableRowRequestType";

const TableRowRequest = ({ item, handleGetFile }: TProps) => {
  return (
    <tr>
      <td className="table-data">{item.id}</td>
      <td className="table-data">
        <AddFileRequest item={item} handleGetFile={handleGetFile} />
      </td>
      <td className="table-data">{item.name}</td>
      <td>
        <IconButton>
          <DeleteOutlineIcon sx={{ color: "red" }} />
        </IconButton>
      </td>
    </tr>
  );
};

export default TableRowRequest;
