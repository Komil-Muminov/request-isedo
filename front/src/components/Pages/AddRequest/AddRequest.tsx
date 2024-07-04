import "./AddRequest.css";
import { Prev } from "../../UI/PrevLink/Prev";
export const AddRequest: React.FC = () => {
	return (
		<>
			<section className="sections">
				<div className="container">
					<div className="addRequest__content">
						<h1>AddRequest</h1>
					</div>
					<Prev className="addrequest_prev" to={"#"}>
						Назад
					</Prev>
				</div>
			</section>
		</>
	);
};
