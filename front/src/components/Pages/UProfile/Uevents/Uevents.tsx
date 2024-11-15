import "./Uevents.css";
interface TProps {
	title: string;
	loading?: boolean;
	type?: string;
	desc: string | null | undefined;
	kind: string | undefined;
	date?: Date;
}
export const Uevents: React.FC<TProps> = ({
	loading,
	title,
	desc = "km",
	type,
	kind,
	date = new Date(),
}: TProps) => {
	const formatDateWithTime = (date: Date) => {
		return date.toLocaleString("ru-RU", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
		});
	};
	return (
		<>
			<div className="uevents__content">
				<div className={`uevents__card ${kind}`}>
					<span className="uevents__date">{formatDateWithTime(date)}</span>

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
