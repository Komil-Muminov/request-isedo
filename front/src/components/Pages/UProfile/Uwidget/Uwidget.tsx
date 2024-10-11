import { Button } from "@mui/material";
import Uchartshort from "../Uchart/Uchartshort/Uchartshort";
import "./Uwidget.css";

export interface UwidgetProps {
	children?: React.ReactNode;
	title?: string | number;
	desc?: string | number;
	kind?: string | undefined;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export const Uwidget: React.FC<UwidgetProps> = ({
	kind,
	onClick,
}: UwidgetProps) => {
	return (
		<>
			<div className={`uwidget__content uwidget__style ${kind}`}>
				<Uchartshort />
				<Button onClick={onClick} className={`uwidget__btn ${kind}`}>
					Показать полную информацию{" "}
				</Button>
			</div>
		</>
	);
};
