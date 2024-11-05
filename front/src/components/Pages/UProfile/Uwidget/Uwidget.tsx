import Uchartshort from "../Uchart/Uchartshort/Uchartshort";
import { useDarkMode } from "../../../API/Hooks/UseDarkMode";
import { Button } from "@mui/material";

import "./Uwidget.css";
export interface UwidgetProps {
	children?: React.ReactNode;
	title?: string | number;
	desc?: string | number;
	kind?: string;
	isLoading?: boolean;
	isDisabled?: boolean;
	type?: string;
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}

export const Uwidget: React.FC<UwidgetProps> = ({
	children,
	title,
	isLoading,
	isDisabled,
	kind,
	type,
	onClick,
}: UwidgetProps) => {
	const { darkModeToggle, isDarkMode } = useDarkMode();

	return (
		<li className={`uwidget__item`}>
			<div
				className={`uwidget__content uwidget__style ${kind} ${
					type === "special" && isDarkMode ? "dark-mode" : ""
				}`}
			>
				<span onClick={onClick} className="uwidget__item-title">
					{title || "TITLE"}
				</span>
				{children || <Uchartshort />}
			</div>
			<span>
				{type === "special" && (
					<Button onClick={darkModeToggle}>Dark Mode</Button>
				)}
			</span>
		</li>
	);
};
