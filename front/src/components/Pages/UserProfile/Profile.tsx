import "./Profile.css";
import { Link } from "react-router-dom";
import { Prev } from "../../UI/PrevLink/Prev";
import { Avatar } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../queryClient";
import { useAuth } from "../../API/Hooks/useAuth";
import { Loader } from "../../UI/Loader";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useState } from "react";
import defUphoto from "../../../assets/ErrorPage.jpg";
import { setPhoto } from "../../API/Hooks/setPhoto";
const Profile: React.FC = () => {
	const [defaultName, setDefaultName] = useState<string | undefined>("Кимки");
	const { getMe } = useAuth();
	const uQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["users", "me"],
		},
		queryClient,
	);

	/**
	 * Отрпавка запроса на добавление фото
	 */

	const [uPhoto, setUphoto] = useState<File | undefined>();
	const handleGetImg = (e: React.ChangeEvent<HTMLImageElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setUphoto(file);
		}
	};

	const photoMutate = useMutation(
		{
			mutationFn: () =>
				setPhoto({ username: uQuery.data?.username, file: uPhoto }),
			onSuccess: () =>
				queryClient.invalidateQueries({ queryKey: ["users", "me"] }),
		},
		queryClient,
	);

	const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		setUphoto(file);
		if (uPhoto) {
			photoMutate.mutateAsync();
			console.log(`first`);
		}
	};
	switch (uQuery.status) {
		case "pending":
			return <Loader />;
		case "error":
			return <ErrorPage />;
	}

	if (uQuery.status === "success") {
		return (
			//Надо реализовать возможность выгрузки фото
			<>
				<section className="sections">
					<h2>PHOTO</h2>
					<form onSubmit={() => photoMutate.mutate()}>
						<input onChange={handleAddFile} type="file" />
						<button>Отрпавить</button>
					</form>
					<h2>PHOTO</h2>
					<div className="container">
						<div className="profile_header">
							<Prev className="profile prev" to={"#"}>
								Назад
							</Prev>
							<h2 className="sections__title profile_title">
								Салом,{" "}
								{uQuery.data?.username ? uQuery.data?.username : defaultName}
							</h2>
							<div className="profile_avatar">
								<Avatar className="nav_user-log" alt="user">
									<img
										style={{ maxWidth: "40px", minHeight: "40px" }}
										src={uQuery.data?.photo ? uQuery.data?.photo : defUphoto}
										alt=""
									/>
								</Avatar>
							</div>
						</div>
						<div className="profile__content km__content">
							<div className="left_side-content">
								<ul className="list">
									<li className="list_item">
										<Link to={"/"} className="item_link">
											Линк
										</Link>
									</li>
								</ul>
							</div>
							<div className="center_content">center</div>
						</div>
					</div>
				</section>
			</>
		);
	}
};
export default Profile;
