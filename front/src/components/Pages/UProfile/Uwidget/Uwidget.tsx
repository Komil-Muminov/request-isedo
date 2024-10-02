import { LoaderPoints } from "../../../UI/LoaderPoints";
import { Button } from "@mui/material";
import "./Uwidget.css";
import Uchartshort from "../Uchart/Uchartshort/Uchartshort";

export interface UwidgetProps {
	children?: React.ReactNode;
	title?: string | number;
	desc: string | number;
	kind: string | undefined;
	isLoading?: boolean;
	disabled?: boolean;
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
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
			<div className="uwidget__content uwidget__style">
				{/* <h3 className={`uwidget__title ${kind}`}>
						{title || `Загаловок виджета`}
					</h3> */}
				<Uchartshort />
				{/* <span className="uwidget__numinfo">{}</span> */}
				{/* {children || <LoaderPoints />} */}
				<Button onClick={onClick} className={`uwidget__btn ${kind}`}>
					Показать полную информацию{" "}
				</Button>
			</div>
		</>
	);
};
