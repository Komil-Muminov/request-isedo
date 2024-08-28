import "./ServicesList.css";

import ButtonPanelControl from "../ButtonPanelControl/ButtonPanelControl";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";

interface TProps {
  handleShowServicesList: (value: boolean) => void;
}

const ServicesList = ({ handleShowServicesList }: TProps) => {
  return (
    <div className="wrapper-service-list">
      <div className="panel-control-service-list">
        <ButtonPanelControl
          icon={
            <ArrowBackIosIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
          }
          text="Назад"
          goBack={handleShowServicesList}
        />
        <ButtonPanelControl
          icon={<SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Сохранить"
        />
      </div>
    </div>
  );
};

export default ServicesList;
