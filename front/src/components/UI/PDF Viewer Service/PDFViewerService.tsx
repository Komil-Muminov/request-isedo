import "./PDFViewerService.css";

import pdfFileService from "../../../assets/pdf-fileservice.png";

const PDFViewerService = ({ item, currentFiles, hideFirstItem }: any) => {
  const CurrentFiles = () => {
    return (
      <>
        {currentFiles?.slice(hideFirstItem ? 1 : 0).map((e: any) => (
          <div key={e.number} className="pdf-viewer-content">
            <div className="pdf-viewer-image">
              <img src={pdfFileService} alt="" />
            </div>
            <div className="pdf-viewer-info">
              <p className="pdf-viewer-title">
                {e ? e?.fileName : "Rework by Excerpts.pdf"}
              </p>
              <p className="pdf-viewer-description">1.8 MB</p>
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
