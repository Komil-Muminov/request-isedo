import { useEffect, useState } from "react";
// Сделать даркмод Uwidget.tsx

export const useDarkMode = () => {
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const savedMode = localStorage.getItem("darkMode");
		return savedMode === "true";
	});

	useEffect(() => {
		// profile_left;
		const profile = document.querySelector(".profile__container");
		const profileNav = document.querySelector(".profile_left");
		const uwidgetFirst = document.querySelector(".uwidget__item-special-1");
		const uwidgetSecond = document.querySelector(".uwidget__item-special-2");
		if (isDarkMode) {
			profile?.classList.add("dark-mode");
			uwidgetFirst?.classList.add("dark-mode");
			uwidgetSecond?.classList.add("dark-mode");
			profileNav?.classList.add("dark-mode");
		} else {
			profile?.classList.remove("dark-mode");
			uwidgetFirst?.classList.remove("dark-mode");
			uwidgetSecond?.classList.remove("dark-mode");
			profileNav?.classList.remove("dark-mode");
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
