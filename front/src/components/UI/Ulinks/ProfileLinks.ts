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
				url: `uNotify`,
				label: `Уведомление`,
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
		subLinks: [{ url: "/uNotify", label: "Запросы на добавление организации" }],
	},
];
