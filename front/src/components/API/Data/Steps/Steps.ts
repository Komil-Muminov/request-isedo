// Этот код представляет собой экспорт массива строк steps с четырьмя элементами. Данные статусы используются для отображения или управления последовательностью шагов в процессе обработки заявки.

import { departments } from "../Departments/Departments";

interface TStep {
  stepName: string;
  stepCode: number;
  initiators: string;
}

export const stepsOfBo: TStep[] = [
  {
    stepName: "Оформление",
    stepCode: 0,
    initiators: "Заявитель",
  },
  {
    stepName: "Исполнение",
    stepCode: 1,
    initiators: "Сотрудник КВД",
  },
  {
    stepName: "Завершено",
    stepCode: 2,
    initiators: "",
  },
];

export const stepsOfKvd: TStep[] = [
  {
    stepName: "Оформление",
    stepCode: 0,
    initiators: "Заявитель",
  },
  {
    stepName: "Исполнение",
    stepCode: 1,
    initiators: departments[0]?.name,
  },
  {
    stepName: "Исполнение",
    stepCode: 1,
    initiators: ` ${departments[1]?.name}, ${departments[2]?.name}, ${departments[3]?.name}, ${departments[0]?.name}, ${departments[4]?.name}`,
  },
  {
    stepName: "Завершено",
    stepCode: 2,
    initiators: "",
  },
];
