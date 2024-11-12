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
		// uwidget__item--specia
		const uwidgetItemSpecialFirstWidget = document.querySelector(
			".uwidget__item-special-1",
		);

		const uwidgetItemSpecialSecondWidget = document.querySelector(
			".uwidget__item-special-2",
		);

		if (isDarkMode) {
			profileSection?.classList.add("dark-mode");
			navigationSection?.classList.add("dark-mode");
			uwidgetItemSpecialFirstWidget?.classList.add("dark-mode");
			uwidgetItemSpecialSecondWidget?.classList.add("dark-mode");
		} else {
			profileSection?.classList.remove("dark-mode");
			navigationSection?.classList.remove("dark-mode");
			uwidgetItemSpecialFirstWidget?.classList.remove("dark-mode");
			uwidgetItemSpecialSecondWidget?.classList.remove("dark-mode");
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
