import { useState } from "react";
import "./Region.css";
// import { useGetChangesInput } from "../../Utils/HandleChange";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const names: string[] = [
	"Горный Бадахшан",
	"Согдийская область",
	"Хатлонская область",
	"Районы республиканского подчинения",
	"Душанбе",
	"Куляб",
	"Худжанд",
	"Бохтар",
	"Турсунзаде",
	"Истаравшан",
];
export const Region: React.FC = () => {
	const [personName, setPersonName] = useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === "string" ? value.split(",") : value,
		);
	};
	return (
		<>
			<section className="sections region__section">
				<div className="container">
					<h2 className="sections__title">REGION</h2>
					<div className="region__content km__content">
						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-checkbox-label">Страна</InputLabel>
							<Select
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput label="Tag" />}
								renderValue={(selected) => selected.join(", ")}
								MenuProps={MenuProps}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={personName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-checkbox-label">Город</InputLabel>
							<Select
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput label="Tag" />}
								renderValue={(selected) => selected.join(", ")}
								MenuProps={MenuProps}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={personName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id="demo-multiple-checkbox-label">Регион</InputLabel>
							<Select
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={personName}
								onChange={handleChange}
								input={<OutlinedInput label="Tag" />}
								renderValue={(selected) => selected.join(", ")}
								MenuProps={MenuProps}
							>
								{names.map((name) => (
									<MenuItem key={name} value={name}>
										<Checkbox checked={personName.indexOf(name) > -1} />
										<ListItemText primary={name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				</div>
			</section>
		</>
	);
};
