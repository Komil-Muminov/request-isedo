import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../API/Hooks/useAuth";
import { queryClient } from "../../../../../queryClient";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import "./Uchartshort.css";

const Uchartshort: React.FC = () => {
	interface Uchartshort {
		children?: React.ReactNode;
		procent: string | null;
		desc: string;
		uname: string;
	}
	const { getMe } = useAuth();
	const uchartshortQuery = useQuery(
		{
			queryFn: () => getMe(),
			queryKey: ["uchartshort"],
		},
		queryClient,
	);

	if (uchartshortQuery?.data) {
		queryClient.invalidateQueries({ queryKey: ["users", "me"] });
	} else {
		console.log(`NO`);
	}
	const UchartshortType: Uchartshort[] = [
		{
			procent: "93%",
			desc: "Красавчик",
			uname: `${uchartshortQuery.data?.fullName}`,
		},
	];

	return (
		<>
			{UchartshortType.map((item) => (
				<>
					<div className="uchartshort__content">
						<div className="uchartshort__left">
							<AccountBalanceIcon className="acountBalanceIcon" />
							<p>Наименование статистики</p>
							{/* <p className="gift__text">{item.uname}</p> */}
							<p className="ucharshort__procent">{item.procent}</p>
						</div>

						<div className="uchartshort__right">
							<TrendingUpIcon className="trendingUpIcon" />
							{/* <EmojiEventsIcon /> */}
							SHORTRIGHT
						</div>
					</div>
				</>
			))}
		</>
	);
};

export default Uchartshort;
