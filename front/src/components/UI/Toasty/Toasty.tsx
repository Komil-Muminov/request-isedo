import { FC, useEffect } from "react";
import "./Toasty.css";

interface ToastProps {
	message: string;
	duration?: number;
	onClose: () => void;
}

const Toasty: FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => {
			clearTimeout(timer);
		};
	}, [duration, onClose]);

	return (
		<div className="toast">
			<div className="toast-message">{message}</div>
			<button className="toast-close-button" onClick={onClose}>
				Закрыть
			</button>
		</div>
	);
};

export default Toasty;
