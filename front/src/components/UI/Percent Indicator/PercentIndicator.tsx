import React from "react";
import "./PercentIndicator.css";

const PercentIndicator = ({
  currentRequest,
  currentCertificate,
  currentUser,
}: any) => {
  return (
    <div className="percent-indicator">
      <div className="circle-container">
        <div className="circle"></div>
        <div className={`wave _50`}></div>
        <div className={`wave _50`}></div>
        <div className={`wave _50`}></div>
        <div className={`wave-below _50`}></div>
        <div className={`desc _50`}>
          {/* <h2>Исполнено</h2> */}
          <p>50%</p>
        </div>
      </div>
    </div>
  );
};

export default PercentIndicator;
