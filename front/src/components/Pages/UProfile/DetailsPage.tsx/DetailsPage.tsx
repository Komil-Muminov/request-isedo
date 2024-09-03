// DetailsPage.tsx
import { useParams } from "react-router-dom";
import { UlinksProps } from "../../../UI/Ulinks/ProfileLinks";

const DetailsPage = () => {
	const { page } = useParams();
	const currentItem = UlinksProps.find((item) => item.url.includes(page || ""));

	if (!currentItem) {
		return <div>Элемент не найден</div>;
	}

	return (
		<div className="detailsPage__content">
			<h2 className="details__title">Details Page</h2>
			<p>Информация про: {currentItem.label}</p>
			{/* No subLinks display here */}
		</div>
	);
};

export default DetailsPage;
