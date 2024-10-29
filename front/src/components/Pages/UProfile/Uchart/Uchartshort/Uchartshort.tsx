import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../../API/Hooks/useAuth";
import { queryClient } from "../../../../../queryClient";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EqualizerChart from "../Equalizer/Equalizer";
import "./Uchartshort.css";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

interface Uchartshort {
	children?: React.ReactNode;
	procent?: string | null;
	desc?: string;
	uname?: string;
}
const Uchartshort: React.FC<Uchartshort> = ({
	children,
	procent,
	desc,
	uname,
}) => {
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
	}
	const UchartshortData: Uchartshort[] = [
		{
			procent: "93%",
			desc: "Красавчик",
			uname: `${uchartshortQuery.data?.fullName}`,
		},
	];

	return (
		<>
			{UchartshortData.map((item) => (
				<>
					<div className="uchartshort__content">
						<div className="uchartshort__left">
							{/* <AccountBalanceIcon className="acountBalanceIcon" /> */}
							{/* <p className="static-text">Наименование статистики</p> */}
							<div className="trending-icon-content">
								<TrendingUpIcon className="trendingUpIcon" />
								<span className="trending-icon-text">+ 68%</span>
							</div>
							{/* <p className="ucharshort__procent">{item.procent}</p> */}
							<p className="gift__text">{item.uname}</p>
						</div>

						<div className="uchartshort__right">
							{/* <EmojiEventsIcon /> */}
							{children ? children : <EqualizerChart />}
						</div>
					</div>
				</>
			))}
		</>
	);
};

export default Uchartshort;
