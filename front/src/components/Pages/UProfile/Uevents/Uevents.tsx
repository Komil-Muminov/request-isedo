// import PersonIcon from "@mui/icons-material/Person";
// import { Button } from "@mui/material";
import { ReactNode } from "react";
import "./Uevents.css";
interface TProps {
	// avatar?: React.ReactNode;
	title: string;
	loading?: boolean;
	type?: string;
	desc: string | null | undefined;
	kind: string | undefined;
	time?: string | ReactNode;
}
export const Uevents: React.FC<TProps> = ({
	// avatar,
	time,
	loading,
	title,
	desc,
	type,
	kind,
}: TProps) => {
	return (
		<>
			<div className="uevents__content">
				<div className={`uevents__card ${kind}`}>
					<span className="events__avatar-rounded">
						{time ? time : "01:04"}
					</span>
					<span className="vertical-line"></span>
					<div className="uevents__header">
						<h2 className={`uevents__title ${type}`}>
							{title ? title : "Заголовок"}
						</h2>
						<p className={`uevents__desc ${type}`}>
							{desc ? desc : loading ? loading : "kmeventsDesc"}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
