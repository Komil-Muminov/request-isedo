import "./DarkModeSwitcher.css";

interface DarkModSwitcherScheme {
	title?: string | undefined;
	isDarkMode?: boolean | string;
	className?: string | undefined;
	onClick?: () => void;
}
const DarkModeSwitcher: React.FC<DarkModSwitcherScheme> = ({
	title,
	className,
	isDarkMode,
	onClick,
}) => {
	return (
		<div
			title={`${title}`}
			className={`switcher__toggle ${className} ${
				isDarkMode ? "dark" : "light"
			}`}
		>
			<div className="switcher__content">
				<div
					className={`switcher__toggle-icon ${
						isDarkMode ? "icon-left" : "icon-right"
					}`}
				></div>
				<span onClick={onClick} className="slider"></span>
			</div>
		</div>
	);
};

export default DarkModeSwitcher;
