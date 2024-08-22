// Этот код представляет собой экспорт массива строк steps с четырьмя элементами. Данные статусы используются для отображения или управления последовательностью шагов в процессе обработки заявки.

export const stepsOfBo = [
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

export const stepsOfKvd = [
  {
    stepName: "Оформление",
    stepCode: 0,
    initiators: "Заявитель",
  },
  {
    stepName: "Исполнение",
    stepCode: 1,
    initiators: "Шуъбаи кор бо муштариён",
  },
  {
    stepName: "Исполнение",
    stepCode: 1,
    initiators:
      "Шуъба оид ба амнияти иттилоотӣ, Шуъба оид ба хизматрасонии техникӣ, Шуъба оид ба кор бо муштариён, Шуъбаи муҳосибот ва хоҷагӣ",
  },
  {
    stepName: "Завершено",
    stepCode: 2,
    initiators: "",
  },
];
