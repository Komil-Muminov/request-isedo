import { useParams } from "react-router-dom";
import "./ShowCRM.css";

const ShowCRM = () => {
  const { id } = useParams();
  return <div>ShowCRM: {id}</div>;
};

export default ShowCRM;
