import "./AddRequest.css";
import { Prev } from "../../UI/PrevLink/Prev";
export const AddRequest: React.FC = () => {
	return (
		<>
			<section className="sections">
				<div className="container">
					<div className="addRequest__content km__content">
						<h1>AddRequest</h1>
						<form className="request_form ">
							<input type="text" className="request_inp" />
							<input type="text" className="request_inp" />
							<input type="text" className="request_inp" />
							<input type="text" className="request_inp" />
							<input type="text" className="request_inp" />
							<input type="text" className="request_inp" />
						</form>
					</div>
					<Prev className="addrequest_prev" to={"#"}>
						Назад
					</Prev>
				</div>
			</section>
		</>
	);
};
