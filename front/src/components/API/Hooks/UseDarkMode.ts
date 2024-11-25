import { useEffect, useState } from "react";

export const useDarkMode = (...elementClassName: string[]) => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		return JSON.parse(localStorage.getItem("darkMode") || "false");
	});

	useEffect(() => {
		if (elementClassName.length > 0) {
			elementClassName.forEach((item) => {
				const element = document.querySelector(`${item.trim()}`);
				if (isDarkMode) {
					element?.classList.add("dark-mode");
				} else {
					element?.classList.remove("dark-mode");
				}
			});
		}
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	const handleIsDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	return { isDarkMode, handleIsDarkMode };
};
