import "./Uevents.css";
interface TProps {
	children: React.ReactNode;
	loading?: boolean;
	type?: string;
	desc: string | null | undefined;
}
export const Uevents: React.FC<TProps> = ({
	children,
	loading,
	desc,
	type,
}: TProps) => {
	return (
		<>
			<div className="uevents__content">
				<div className="uevents__card">
					<h2 className={`uevents__title ${type}`}>
						{children ? children : loading ? loading : "kmEvents"}
					</h2>
					<p className={`uevents__desc ${type}`}>
						{" "}
						{desc ? desc : loading ? loading : "kmeventsDesc"}
					</p>
				</div>
			</div>
		</>
	);
};
