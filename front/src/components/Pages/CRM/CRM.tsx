import React from "react";
import { NavBottom } from "../NavBottom/NavBottom";
import { Outlet } from "react-router-dom";

const CRM = () => {
  return (
    <>
      <NavBottom />
      CRM
      <Outlet />
    </>
  );
};

export default CRM;
