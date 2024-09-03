import { Link } from "react-router-dom";
export interface TProps {
	to: string;
	className?: string;
	children: React.ReactNode;
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}
export const Ulink: React.FC<TProps> = ({ to, className, children }) => {
	return (
		<Link to={to} className={className}>
			{children ? children : `Ссылка`}
		</Link>
	);
};
