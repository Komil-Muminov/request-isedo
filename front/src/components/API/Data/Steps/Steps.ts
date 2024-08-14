// Этот код представляет собой экспорт массива строк steps с четырьмя элементами. Данные статусы используются для отображения или управления последовательностью шагов в процессе обработки заявки.

// export const stepsOfBo: string[] = ["Оформление", "Исполнение", "Завершено"];

export const stepsOfBo = [
  {
    step: "Оформление",
    stepCode: 1,
    initiators: "Заявитель",
  },
  {
    step: "Исполнение",
    stepCode: 2,
    initiators: "Сотрудник КВД",
  },
  {
    step: "Завершено",
    stepCode: 3,
    initiators: "",
  },
];

export const stepsOfKvd = [
  {
    step: "Оформление",
    stepCode: 1,
    initiators: "Заявитель",
  },
  {
    step: "Исполнение",
    stepCode: 2,
    initiators: "Шуъбаи кор бо муштариён",
  },
  {
    step: "Исполнение",
    stepCode: 2,
    initiators:
      "Шуъбаи амнияти иттилооти, Шуъбаи дастгирии техники, Шуъбаи кор бо муштариён, Шуъбаи мухосибот",
  },
  {
    step: "Завершено",
    stepCode: 3,
    initiators: "",
  },
];

// export const stepsOfKvd: string[] = [
//   `${stepsOfBo[0]}: Заявитель`,
//   `${stepsOfBo[1]}: Шуъбаи кор бо муштариён`,
//   `${stepsOfBo[1]}: `,
//   stepsOfBo[2],
// ];
