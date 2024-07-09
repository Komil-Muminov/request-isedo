type TProps = {
	text: string;
};

export const ToUpperCase = (text: string): TProps => ({
	text: text.toUpperCase(),
});
