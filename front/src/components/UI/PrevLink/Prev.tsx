import "./Prev.css";
import { Link, useNavigate } from "react-router-dom";
interface TProps {
	children: React.ReactNode;
	className: string | undefined;
	to?: string;
	onClick?: ((e: React.SyntheticEvent<HTMLElement>) => void) | (() => void);
}
export const Prev: React.FC<TProps> = ({ children, className }) => {
	const navigate = useNavigate();
	return (
		<>
			<Link
				className={`prevLink ${className}`}
				to={"#"}
				onClick={() => navigate(-1)}
			>
				{children || `Назад`}
			</Link>
		</>
	);
};
