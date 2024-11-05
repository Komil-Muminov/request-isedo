import { useEffect, useState } from "react";

export const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const savedMode = localStorage.getItem("darkMode");
		return savedMode === "true";
	});

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	const darkModeToggle = () => {
		setIsDarkMode((prev) => !prev);
	};

	return { isDarkMode, darkModeToggle };
};
