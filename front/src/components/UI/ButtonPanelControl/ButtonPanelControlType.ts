import { ReactNode } from "react";
import { NavigateFunction } from "react-router-dom";

export interface TProps {
  icon: ReactNode;
  text: string;
  goBack?: any;
}
