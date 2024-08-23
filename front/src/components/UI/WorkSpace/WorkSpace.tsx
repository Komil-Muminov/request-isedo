import TitleDocument from "../TitleDocument/TitleDocument";
import "./WorkSpace.css";

const WorkSpace = () => {
  return (
    <section className="work-space-content">
      <TitleDocument title="Рабочее пространство" />
      <div className="navigation-tabs">
        <ul className="wrapper-tabs">
          <li className="tab active">Шуъбаи кор бо муштариён</li>
          <li className="tab active">Шуъба оид ба амнияти иттилоотӣ</li>
          <li className="tab active">Шуъба оид ба хизматрасонии техникӣ</li>
          <li className="tab active">Шуъбаи муҳосибот ва хоҷагӣ</li>
        </ul>
      </div>
    </section>
  );
};

export default WorkSpace;
