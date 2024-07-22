import { LoaderPoints } from "../LoaderPoints/LoaderPoints";
import "./Button.css";
interface TProps {
	isLoading?: boolean;
	disabled?: boolean;
	children?: React.ReactNode;
	type?: string;
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
}
export const ButtonKM: React.FC<TProps> = ({
	isLoading,
	disabled,
	children,
	onClick,
	type,
}) => {
	return (
		<>
			<button
				onClick={onClick}
				className={`btn ${type}`}
				disabled={disabled || isLoading}
			>
				{isLoading ? <LoaderPoints /> : `${children}`}
			</button>
		</>
	);
};
