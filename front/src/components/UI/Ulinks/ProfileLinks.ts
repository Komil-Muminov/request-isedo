export interface UlinkScheme {
	url: string;
	label: string;
	subLinks?: UlinkScheme[];
}

export const UlinksProps: UlinkScheme[] = [
	{
		url: "udetails",
		label: "Информация про пользователя",
		subLinks: [
			{
				url: "/udetails",
				label: "КМ ПРИМЕР",
			},
		],
	},
	{
		url: "/account/create",
		label: "Модуль заявки",
		subLinks: [
			{
				url: `unotify`,
				label: `Заявки`,
			},

			// {
			// 	url: "udetails",
			// 	label: "Информация о пользователе",
			// },
		],
	},
	{
		url: "/organization",
		label: "Организация",
	},
	{
		url: "/account",
		label: "Заявки",
		subLinks: [{ url: "unotify", label: "Запросы на добавления организаций" }],
	},
];
