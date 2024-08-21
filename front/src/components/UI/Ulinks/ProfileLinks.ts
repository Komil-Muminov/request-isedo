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
        url: `unotify`,
        label: `Уведомление`,
      },

      {
        url: "udetails",
        label: "Информация о пользователе",
      },
    ],
  },
  {
    url: "/organization",
    label: "Организация",
  },
  {
    url: "/account",
    label: "Заявки",
    subLinks: [{ url: "unotify", label: "Запросы на добавление организации" }],
  },
];
