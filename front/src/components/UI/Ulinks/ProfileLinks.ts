export interface UlinkScheme {
	url: string;
	label: string;
	subLinks?: UlinkScheme[];
}

export const UlinksProps: UlinkScheme[] = [
	{
		url: "udetails",
		label: "Профиль",
		subLinks: [
			{
				url: "udetails",
				label: "Другая страница",
			},
		],
	},
	{
		url: "/account",
		label: "Модуль заявки",
		subLinks: [
			{ url: "unotify", label: "Запросы на добавления организаций" },
			{
				url: "/account/create",
				label: "Создать заявку",
			},
		],
	},

	{
		url: "/account",
		label: "Модуль модулей",
		subLinks: [
			{ url: "unotify", label: "Запросы на добавления организаций" },
			{
				url: "/account/create",
				label: "Создать заявку",
			},
		],
	},

	{
		url: "/account",
		label: "Модуль доступа",
		subLinks: [
			{ url: "unotify", label: "Запросы на добавления организаций" },
			{
				url: "/account/create",
				label: "Создать заявку",
			},
		],
	},

	{
		url: "/account",
		label: "Модуль Хаб",
		subLinks: [
			{ url: "unotify", label: "Запросы на добавления организаций" },
			{
				url: "/account/create",
				label: "Создать заявку",
			},
		],
	},
];
