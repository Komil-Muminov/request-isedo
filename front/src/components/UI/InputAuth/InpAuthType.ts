export interface TProps {
	register: any;
	inputName: string;
	inputPlaceholder: string;
	inputType: string;
	requiredMessage: string;
	minLengthMessage: string;
	kind: string;
	inputDefaultValue?: string | undefined | null;
	inputDisabled?: boolean | null;
	disabled?: boolean;
	value?: string | null | undefined;
}
