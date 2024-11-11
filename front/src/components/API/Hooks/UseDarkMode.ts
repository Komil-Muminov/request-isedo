import { useEffect, useState } from "react";
// Сделать даркмод Uwidget.ts x

export const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const savedMode = localStorage.getItem("darkMode");
		return savedMode === "true";
	});

	useEffect(() => {
		// profile_left;
		const profileSection = document.querySelector(".profile");
		const navigationSection = document.querySelector(".navigation__section");

		if (isDarkMode) {
			profileSection?.classList.add("dark-mode");
			navigationSection?.classList.add("dark-mode");
		} else {
			profileSection?.classList.remove("dark-mode");
			navigationSection?.classList.remove("dark-mode");
		}
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	const darkModeToggle = () => {
		setIsDarkMode((prev) => !prev);
	};

	return {
		isDarkMode,
		darkModeToggle,
	};
};
