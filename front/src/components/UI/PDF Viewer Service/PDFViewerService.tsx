import "./PDFViewerService.css";

import pdfFileService from "../../../assets/pdf-fileservice.png";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";

const PDFViewerService = ({ item, currentFiles, hideFirstItem }: any) => {
  const CurrentFiles = () => {
    return (
      <>
        {currentFiles?.slice(hideFirstItem ? 1 : 0).map((e: any) => (
          <div key={e.id} className="pdf-viewer-content">
            <div className="pdf-viewer-image">
              {e.type === "pdf" ? (
                <img src={pdfFileService} alt="" />
              ) : (
                <div className="unknown-file-type">
                  <HelpCenterIcon sx={{ fontSize: "30px" }} />
                  <p>Неизвестный тип документа</p>
                </div>
              )}
            </div>
            <div className="pdf-viewer-info">
              <p className="pdf-viewer-title">
                {e ? e?.fileName : "Rework by Excerpts.pdf"}
              </p>
              <p className="pdf-viewer-description">{e.size}</p>
            </div>
          </div>
        ))}
      </>
    );
  };

  return currentFiles ? (
    <CurrentFiles />
  ) : (
    <div className="pdf-viewer-content">
      <div className="pdf-viewer-image">
        <img src={pdfFileService} alt="" />
      </div>
      <div className="pdf-viewer-info">
        <p className="pdf-viewer-title">
          {item ? item?.name : "Rework by Excerpts.pdf"}
        </p>
        <p className="pdf-viewer-description">1.8 MB</p>
      </div>
    </div>
  );
};

export default PDFViewerService;
