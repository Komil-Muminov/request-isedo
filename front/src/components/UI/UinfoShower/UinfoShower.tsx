export interface TProps {
	className: string;
	children: React.ReactNode;
    
}
export const Uinfoshower: React.FC<TProps> = ({ className, children }) => {
	return (
		<>
			<span className="sections__desc uinfo_tex ">
				{children}
				<p className={className}>{children}</p>
			</span>
		</>
	);
};
