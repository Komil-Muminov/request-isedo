import TitleDocument from "../TitleDocument/TitleDocument";
import "./WorkSpace.css";
import { departments } from "../../API/Data/Departments/Departments";

const WorkSpace = () => {
  const changeOfAccountant = [
    departments[0],
    departments[1],
    departments[2],
    departments[3],
  ];

  console.log(changeOfAccountant);

  return (
    <section className="work-space-content">
      <TitleDocument title="Рабочее пространство" />
      <div className="navigation-tabs">
        <ul className="wrapper-tabs">
          {changeOfAccountant.map((e) => {
            return (
              <li key={e.id} className="tab active">
                {e.name}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default WorkSpace;
