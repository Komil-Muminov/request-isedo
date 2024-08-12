export interface UlinkScheme {
	url: string;
	label: string;
	subLinks?: UlinkScheme[]; // Optional property for nested links
}

export const UlinksProps: UlinkScheme[] = [
	{
		url: "/account",
		label: "Главная страница",
		subLinks: [
			{
				url: `udetails`,
				label: `Уведомление`,
			},

			{
				url: "udetails",
				label: "Информация о пользовател",
			},
		],
	},
	{
		url: "/organization",
		label: "Организация",
	},
	{
		url: "/account",
		label: "Модуль заявки",
		subLinks: [{ url: "unotify", label: "Запросы на добавление организации" }],
	},
];
