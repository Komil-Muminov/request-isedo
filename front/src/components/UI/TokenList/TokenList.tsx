import ButtonPanelControl from "../ButtonPanelControl/ButtonPanelControl";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SaveIcon from "@mui/icons-material/Save";

interface TProps {
  handleShowTokenList: (value: boolean) => void;
}

const TokenList = ({ handleShowTokenList }: TProps) => {
  return (
    <div className="wrapper-token-list">
      <div className="panel-control-service-list">
        <ButtonPanelControl
          icon={
            <ArrowBackIosIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />
          }
          text="Назад"
          goBack={handleShowTokenList}
        />
        <ButtonPanelControl
          icon={<SaveIcon sx={{ fontSize: "18px", fontWeight: "bold" }} />}
          text="Сохранить"
          //   handleSubmit={handleSave}
          //   handleCloseAfterSave={handleShowServicesList}
        />
      </div>
    </div>
  );
};

export default TokenList;
