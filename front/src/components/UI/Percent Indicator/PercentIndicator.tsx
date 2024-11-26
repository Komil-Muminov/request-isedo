import "./PercentIndicator.css";

const PercentIndicator = ({ percent }: any) => {

  return (
    <div className="percent-indicator">
      <div className="circle-container">
        <div className="circle"></div>
        <div className={`wave _${percent}`}></div>
        <div className={`wave _${percent}`}></div>
        <div className={`wave _${percent}`}></div>
        <div className={`wave-below _${percent}`}></div>
        <div className={`desc _${percent}`}>
          {/* <h2>Исполнено</h2> */}
          <p>{percent}%</p>
        </div>
      </div>
    </div>
  );
};

export default PercentIndicator;
