import Uchartshort from "../Uchart/Uchartshort/Uchartshort";

import "./Uwidget.css";
export interface UwidgetProps {
	children?: React.ReactNode;
	title?: string | number;
	desc?: string | number;
	kind?: string;
	isLoading?: boolean;
	isDisabled?: boolean;
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export const Uwidget: React.FC<UwidgetProps> = ({
	children,
	title,
	kind,
	onClick,
}: UwidgetProps) => {
	return (
		<li className={`uwidget__item`}>
			<div className={`uwidget__content uwidget__style ${kind}`}>
				<span onClick={onClick} className="uwidget__item-title">
					{title || "TITLE"}
				</span>
				{children || <Uchartshort />}
			</div>
		</li>
	);
};
