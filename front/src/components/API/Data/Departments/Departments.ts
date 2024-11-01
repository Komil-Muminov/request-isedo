interface TStages {
  id: number;
  successedValue: boolean | number | string;
  stepTask: number;
  successedPercent?: string;
  defaultPercent?: string;
}
export interface TDepartment {
  id: number;
  name: string;
  state: boolean;
  stages?: TStages[];
}

export const departments: TDepartment[] = [
  {
    id: 1,
    name: "Шуъба оид ба кор бо муштариён",
    state: true,
    stages: [
      {
        id: 1,
        successedValue: 5,
        stepTask: 3,
        defaultPercent: "0%",
        successedPercent: "100%",
      },
    ],
  },
  {
    id: 2,
    name: "Шуъба оид ба амнияти иттилоотӣ",
    state: false,
    stages: [
      {
        id: 1,
        successedValue: false,
        stepTask: 3,
        defaultPercent: "0%",
        successedPercent: "100%",
      },
    ],
  },
  {
    id: 3,
    name: "Шуъба оид ба хизматрасонии техникӣ",
    state: false,
    stages: [
      {
        id: 1,
        successedValue: false,
        stepTask: 3,
        defaultPercent: "0%",
        successedPercent: "100%",
      },
    ],
  },
  {
    id: 4,
    name: "Шуъбаи муҳосибот ва хоҷагӣ",
    state: false,
  },
  {
    id: 5,
    name: "Бахш оид ба идоракунии кадрҳо",
    state: false,
  },
  {
    id: 6,
    name: "Шуъбаи оид ба маъмуриятчигӣ ва нигаҳдошти системавӣ",
    state: false,
  },
  {
    id: 7,
    name: "Шуъба оид ба таҳия ва татбиқи барномаҳои иттилоотӣ",
    state: false,
  },
];
