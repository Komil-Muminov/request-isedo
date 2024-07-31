import { Link } from "react-router-dom";
export interface TProps {
	to: string;
	className: string;
	children: React.ReactNode;
}
export const Ulink: React.FC<TProps> = ({ to, className, children }) => {
	return (
		<ul className="links__list">
			<li className="links_item">
				<Link to={to} className={className}>
					{children}
				</Link>
			</li>
		</ul>
	);
};
