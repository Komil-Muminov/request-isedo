import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button, TextField } from "@mui/material";
import { useUidentity } from "../../API/Hooks/useUidentity";

//
import "./Identification.css";
import InputIdentification from "../../UI/InputIdentification/InputIdentification";

const Identification: React.FC = () => {
	const { postUidentity } = useUidentity();

	const navigate = useNavigate();

	return (
		// <main>
		<section className="sections">
			<div className="wrapper-prev">
				<div className="container">
					<Button
						onClick={() => navigate(-1)}
						variant="outlined"
						sx={{ borderRadius: "50px" }}
					>
						Назад
					</Button>
				</div>
			</div>
			<div className="container">
				<div className="wrapper-identification">
					<h1 className="sections__title">Форма идентификации пользователя</h1>
					<form>
						<InputIdentification
							labelText="Наименование организации*"
							typeInput="text"
						/>
						<InputIdentification
							labelText="Наименование Отдела*"
							typeInput="text"
						/>
						<InputIdentification labelText="Должность*" typeInput="text" />
						<InputIdentification typeInput="file" />
						<Button type="submit">Отправить</Button>
					</form>
				</div>
			</div>
		</section>
		// </main>
	);
};

export default Identification;
