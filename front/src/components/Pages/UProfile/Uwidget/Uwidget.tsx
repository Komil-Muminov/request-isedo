import { Link } from "react-router-dom";
import { LoaderPoints } from "../../../UI/LoaderPoints";
import "./Uwidget.css";
import { Button } from "@mui/material";

export interface UwidgetProps {
	children?: React.ReactNode;
	title?: string | number;
	desc: string | number;
	kind: string | undefined;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

export const Uwidget: React.FC<UwidgetProps> = ({
	children,
	title,
	desc,
	kind,
	onClick,
}: UwidgetProps) => {
	return (
		<>
			<Button onClick={onClick} className={`uwidget__style ${kind}`}>
				<h3 className={`${kind}`}>{title || `Загаловок виджета`}</h3>
				<p className={`${kind}`}>{desc || `Описание виджета`}</p>
				{children || <LoaderPoints />}
			</Button>
		</>
	);
};
