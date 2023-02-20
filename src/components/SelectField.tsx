import { useState } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import {
	categoryChangeAction,
	difficultyChangeAction,
	typeChangeAction,
} from "../store/slices/questionSlice";
import { IOptions } from "../model/IOptions";
import { SelectChangeEvent } from "@mui/material/Select";

import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface PropsType {
	label: string;
	options: IOptions[];
}

export const SelectField = ({ label, options }: PropsType) => {
	const [value, setValue] = useState("");
	const dispatch = useAppDispatch();

	const handleChange = (event: SelectChangeEvent<string>) => {
		setValue(event.target.value);

		switch (label) {
			case "Category":
				dispatch(categoryChangeAction(event.target.value));
				break;

			case "Difficulty":
				dispatch(difficultyChangeAction(event.target.value));
				break;

			case "Type":
				dispatch(typeChangeAction(event.target.value));
				break;

			default:
				return;
		}
	};

	return (
		<Box mb={3} width="100%" textAlign="start">
			<FormControl size="small" fullWidth>
				<InputLabel>{label}</InputLabel>
				<Select value={value} label={label} onChange={handleChange}>
					{options.map(({ id, name }) => (
						<MenuItem value={id} key={id}>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	);
};
