interface TProps {
	name: string;
	ExistingCustomers: number;
	NewCustomers: number;
}

// BAR__CHART
export const BarchartData: TProps[] = [
	{ name: "Jan", ExistingCustomers: 3000, NewCustomers: 1000 },
	{ name: "Feb", ExistingCustomers: 4000, NewCustomers: 2000 },
	{ name: "Mar", ExistingCustomers: 5000, NewCustomers: 4000 },
	{ name: "Apr", ExistingCustomers: 3000, NewCustomers: 2000 },
	{ name: "May", ExistingCustomers: 7000, NewCustomers: 5000 },
];

// DONATE__CHART

interface ChartData {
	name: string;
	value: number;
	color: string;
}

export const DashboardchartData: ChartData[] = [
	{ name: "Нормально", value: 1650, color: "#FFBB28" },
	{ name: "Отлично", value: 350, color: "#FF8042" },
	{ name: "Вообши молодец", value: 458, color: "#0088FE" },
];
