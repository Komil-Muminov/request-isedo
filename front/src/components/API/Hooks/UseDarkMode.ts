import { useEffect, useState } from "react";

export const useDarkMode = (elementClassName: string) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		return JSON.parse(localStorage.getItem("darkMode") || "false");
	});

	useEffect(() => {
		if (elementClassName) {
			const element = document.querySelector(`${elementClassName}`);
			if (isDarkMode) {
				element?.classList.add("dark-mode");
			} else {
				element?.classList.remove("dark-mode");
			}
		}
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode, elementClassName]);

	const handleIsDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	useEffect(() => {
		console.log(`isDarkMode updated: ${isDarkMode}`);
	}, [isDarkMode]);
	return [isDarkMode, handleIsDarkMode] as const;
};
