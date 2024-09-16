interface TProps {
	name: string;
	uv: number; // Измените тип на number
	pv: number; // Измените тип на number
	amt: number; // Измените тип на number
}

export const UchartData: TProps[] = [
	{
		name: "test data",
		uv: 2000,
		pv: 3000,
		amt: 1000,
	},

	{
		name: "test data",
		uv: 400,
		pv: 400,
		amt: 700,
	},

	{
		name: "test data",
		uv: 2000,
		pv: 3000,
		amt: 9000,
	},
];
