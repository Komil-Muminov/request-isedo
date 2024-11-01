import PersonIcon from "@mui/icons-material/Person";
import { Button } from "@mui/material";
import "./Uevents.css";
interface TProps {
	avatar?: React.ReactNode;
	title: string;
	loading?: boolean;
	type?: string;
	desc: string | null | undefined;
	kind: string | undefined;
}
export const Uevents: React.FC<TProps> = ({
	avatar,
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
					<div className="uevents__avatar">
						<div className="events__avatar-rounded">
							{avatar ? avatar : <PersonIcon />}
						</div>
					</div>
					<div className="uevents__header">
						<h2 className={`uevents__title ${type}`}>
							{title ? title : "Заголовок"}
						</h2>
					</div>
					<p className={`uevents__desc ${type}`}>
						{desc ? desc : loading ? loading : "kmeventsDesc"}
					</p>
				</div>
			</div>
		</>
	);
};
