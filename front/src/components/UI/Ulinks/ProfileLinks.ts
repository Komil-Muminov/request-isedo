export interface UlinkScheme {
	url: string;
	label: string;
	subLinks?: UlinkScheme[];
}

export const UlinksProps: UlinkScheme[] = [
	{
		url: "/uprofile",
		label: "Профиль",
		subLinks: [
			{
				url: "udetails",
				label: "Другая страница",
			},
		],
	},
	{
		url: "/requests",
		label: "Модуль заявки",
		subLinks: [
			{ url: "unotify", label: "Запросы на добавления организаций" },
			{
				url: "/requests/create",
				label: "Создать заявку",
			},
		],
	},
	{
		url: "/crm",
		label: "Модуль СРМ",
		subLinks: [
			{
				url: "/crm/create",
				label: "Создать карточку организации",
			},
		],
	},
	// {
	// 	url: "/requests",
	// 	label: "Модуль модулей",
	// 	subLinks: [
	// 		{ url: "unotify", label: "Запросы на добавления организаций" },
	// 		{
	// 			url: "/requests/create",
	// 			label: "Создать заявку",
	// 		},
	// 	],
	// },
	// {
	// 	url: "/requests",
	// 	label: "Модуль доступа",
	// 	subLinks: [
	// 		{ url: "unotify", label: "Запросы на добавления организаций" },
	// 		{
	// 			url: "/requests/create",
	// 			label: "Создать заявку",
	// 		},
	// 	],
	// },
	// {
	// 	url: "/requests",
	// 	label: "Модуль Хаб",
	// 	subLinks: [
	// 		{ url: "unotify", label: "Запросы на добавления организаций" },
	// 		{
	// 			url: "/requests/create",
	// 			label: "Создать заявку",
	// 		},
	// 	],
	// },
];
