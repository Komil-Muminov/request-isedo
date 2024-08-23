import "./TitleDocument.css";

interface TProps {
  title: string;
}

const TitleDocument = ({ title }: TProps) => {
  return (
    <div className="title">
      <p>{title}</p>
    </div>
  );
};

export default TitleDocument;
