export interface TDepartment {
  id: number;
  name: string;
  state: boolean;
}

export const departments: TDepartment[] = [
  {
    id: 1,
    name: "Шуъба оид ба кор бо муштариён",
    state: true,
  },
  {
    id: 2,
    name: "Шуъба оид ба амнияти иттилоотӣ",
    state: false,
  },
  {
    id: 3,
    name: "Шуъба оид ба хизматрасонии техникӣ",
    state: false,
  },
  {
    id: 4,
    name: "Шуъба муҳосибот ва хоҷагӣ",
    state: false,
  },
  {
    id: 5,
    name: "Бахш оид ба идоракунии кадрҳо",
    state: false,
  },
  {
    id: 6,
    name: "Шуъба оид ба маъмуриятчигӣ ва нигаҳдошти системавӣ",
    state: false,
  },
  {
    id: 7,
    name: "Шуъба оид ба таҳия ва татбиқи барномаҳои иттилоотӣ",
    state: false,
  },
];
