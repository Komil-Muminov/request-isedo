import { useParams } from "react-router-dom";
import { UlinksProps } from "../../../UI/Ulinks/ProfileLinks";
import Profile from "../Udetails/Udetails";
import "./ModulsDetails.css";

const DetailsPage = () => {
	const { page } = useParams();
	const currentItem = UlinksProps.find((item) =>
		item.url.includes(page?.trim() || ""),
	);

	if (!currentItem) {
		return <div>Элемент не найден</div>;
	}

	// Если это профиль, рендерим компонент Профиля
	if (currentItem.label === "Профиль") {
		return <Profile />;
	}

	return (
		<>
			<div className="detailsPage__content">
				<h2 className="details__title">Moduls details page</h2>
				<p>Информация про: {currentItem.label}</p>
				{currentItem.label}
				<span>
					<p>
						Добро пожаловать в модуль {currentItem.label}! Этот модуль
						предоставляет удобный интерфейс для создания, управления и
						отслеживания заявок.
					</p>
				</span>
				<p>
					<strong>Основные функции:</strong>
				</p>
				<ul>
					<li>
						<strong>Создание заявок:</strong> Легко создавайте новые заявки,
						указывая все необходимые детали.
					</li>
					<li>
						<strong>Управление статусами:</strong> Отслеживайте и обновляйте
						статусы ваших заявок на каждом этапе обработки.
					</li>
					<li>
						<strong>Автоматические уведомления:</strong> Получайте уведомления о
						важных изменениях и действиях по заявкам.
					</li>
					<li>
						<strong>Аналитика и отчеты:</strong> Используйте встроенные
						инструменты для анализа и генерации отчетов по заявкам.
					</li>
				</ul>
				<p>
					<strong>Преимущества:</strong>
				</p>
				<ul>
					<li>Интуитивно понятный интерфейс.</li>
					<li>Масштабируемость и гибкость настройки.</li>
					<li>Поддержка интеграций с другими системами.</li>
				</ul>
				<p>
					Если у вас возникли вопросы или нужна помощь, не стесняйтесь
					обращаться в службу поддержки.
				</p>
				<a href="/support" className="btn">
					Связаться с поддержкой
				</a>
			</div>
		</>
	);
};

export default DetailsPage;
