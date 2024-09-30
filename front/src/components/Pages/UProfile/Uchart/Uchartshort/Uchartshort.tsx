import { useQuery } from "@tanstack/react-query";
import "./Uchartinfo.css";
interface Uchartshort {
	children: React.ReactNode;
	procent: string | null;
	desc: string;
}

interface UchartinfoScheme {
	onClick?: (e: React.SyntheticEvent<HTMLElement>) => void;
	children: React.ReactNode;
	kind?: string | undefined;
}

export const UchartshortData: UchartinfoScheme[] = [
    {
        
    }
];

const Uchartshort: React.FC<Uchartinfo> = ({ procent, desc, children }) => {
	return (
		<div className="uchartinfo__content">
			<span className="uchartinfo__procent">
				{procent ? procent : children}
			</span>
			<p className="uchartinfo__desc"> {desc ? desc : children}</p>
		</div>
	);
};

export default Uchartshort;
