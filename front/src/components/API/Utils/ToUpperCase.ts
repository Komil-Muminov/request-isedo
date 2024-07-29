// Преобразовывает строки в верхний регистр и упаковки результата в объект с типом TProps.
type TProps = {
  text: string;
};

export const ToUpperCase = (text: string): TProps => ({
  text: text.toUpperCase(),
});
