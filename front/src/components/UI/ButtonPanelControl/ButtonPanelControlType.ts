import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

export interface TProps {
  icon?: ReactNode;
  text?: string;
  goBack?: any;
  handleSubmit?: any;
  activeSendButton?: boolean;
  handleCloseAfterSave?: any;
  setShowTypeRequest?: any;
  handleShow?: any;
}
