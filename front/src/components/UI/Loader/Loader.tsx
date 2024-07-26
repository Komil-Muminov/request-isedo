import { useState, useEffect } from "react";
import "./Loader.css";

export const Loader = () => {
	const [visible, setVisible] = useState(true);

	// Анимация исчезновения после 3 секунд
	useEffect(() => {
		const timer = setTimeout(() => {
			setVisible(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{visible && (
				<div className="loading__container">
					<div className="loading__content">
						<div className="loading__spinner"></div>
						<span className="loading__message">Интизор бошед...</span>
					</div>
				</div>
			)}
		</>
	);
};
