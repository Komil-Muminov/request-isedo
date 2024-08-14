import AddFileRequest from "../AddFileRequest/AddFileRequest";
import { IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TProps } from "./TableRowRequestType";

const TableRowRequest = ({ item }: TProps) => {
  const { id, name } = item;
  return (
    <tr>
      <td className="table-data">{id}</td>
      <td className="table-data">
        <AddFileRequest />
      </td>
      <td className="table-data">{name}</td>
      <td>
        <IconButton>
          <DeleteOutlineIcon sx={{ color: "red" }} />
        </IconButton>
      </td>
    </tr>
  );
};

export default TableRowRequest;
