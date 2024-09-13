import { Link } from "react-router-dom";
import { LoaderPoints } from "../../../UI/LoaderPoints";
import "./Uwidget.css";

export interface UwidgetProps {
	children?: React.ReactNode;
	title?: string | number;
	desc: string | number;
	kind: string | undefined;
	isLoading?: boolean;
	disabled?: boolean;
}

export const Uwidget: React.FC<UwidgetProps> = ({
	children,
	title,
	desc,
	isLoading,
	kind,
	disabled,
}: UwidgetProps) => {
	return (
		<>
			<Link
				className={`uwidget__style ${kind}`}
				disabled={disabled || isLoading}
			>
				<h3 className={`${kind}`}>{title || `Загаловок виджета`}</h3>
				<p className={`${kind}`}>{desc || `Описание виджета`}</p>
				{children || <LoaderPoints />}
			</Link>
		</>
	);
};
