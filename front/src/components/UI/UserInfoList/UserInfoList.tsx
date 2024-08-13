import React from "react";
import { TProps } from "./UserInfoListType";
import "./UserInfoList.css";

const UserInfoList = ({ title, description }: TProps) => {
  return (
    <li className="list">
      <p className="list-title">{title}</p>
      <p className="list-description">{description}</p>
    </li>
  );
};

export default UserInfoList;
