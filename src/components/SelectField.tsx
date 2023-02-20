import { useState } from "react";
import { useAppDispatch } from "../hooks/redux-hooks";
import {
	handleCategoryChange,
	handleDifficultyChange,
	handleTypeChange,
} from "../store/slices/questionSlice";
import { IOptions } from "../model/IOptions";
import { SelectChangeEvent } from "@mui/material/Select";

import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface PropType {
	label: string;
	options: IOptions[];
}

export const SelectField = ({ label, options }: PropType) => {
	const [value, setValue] = useState("");
	const dispatch = useAppDispatch();

	const handleChange = (event: SelectChangeEvent<string>) => {
		setValue(event.target.value);
		switch (label) {
			case "Category":
				dispatch(handleCategoryChange(event.target.value));
				break;

			case "Difficulty":
				dispatch(handleDifficultyChange(event.target.value));
				break;

			case "Type":
				dispatch(handleTypeChange(event.target.value));
				break;

			default:
				return;
		}
	};

	return (
		<Box mb={3} width="100%" textAlign="start">
			<FormControl size="small" fullWidth>
				<InputLabel>{label}</InputLabel>
				<Select
					value={value}
					label={label}
					onChange={(event) => handleChange(event)}
				>
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
