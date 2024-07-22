import "./BtnLink.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { LoaderPoints } from "../LoaderPoints";

interface TProps {
	to: string;
	children: React.ReactNode;
	type: string;
	onClick: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export const BtnLink: React.FC<TProps> = ({ to, children, type }) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	return (
		<>
			<Link
				to={to}
				className={`${type}`}
				onClick={() => setIsLoading(!isLoading)}
			>
				{isLoading ? <LoaderPoints /> : children}
			</Link>
		</>
	);
};
