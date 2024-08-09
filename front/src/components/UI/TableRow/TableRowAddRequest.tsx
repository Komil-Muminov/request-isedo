import React from "react";

import { IconButton } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { TProps } from "./TableRowAddRequestType";

const TableRowAddRequest = ({ fileId, typeName }: TProps) => {
  return (
    <tr>
      <td className="table-data">{fileId}</td>
      <td className="table-data">
        <input type="file" />
      </td>
      <td className="table-data">{typeName}</td>
      <td>
        <IconButton>
          <DeleteOutlineIcon sx={{ color: "red" }} />
        </IconButton>
      </td>
    </tr>
  );
};

export default TableRowAddRequest;
