import { useState } from "react";
import { useAppSelector } from "../hooks/redux-hooks";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/system";
import { Button } from "@mui/material";
import { SelectField } from "../components/SelectField";
import { TextFieldComponent } from "../components/TextFieldComponent";

import { categoryOption, difficultyOptions, typeOptions } from "../data/data";

export const SettingsPage = () => {
	const [error, setError] = useState("");
	const { amount_of_questions } = useAppSelector((state) => state.questionSlice);
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		if (Number(amount_of_questions) >= 5) {
			navigate("/game");
		} else {
			setError("Minimum amount of questions is 5");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<SelectField options={categoryOption} label="Category" />
			<SelectField options={difficultyOptions} label="Difficulty" />
			<SelectField options={typeOptions} label="Type" />
			<TextFieldComponent error={error} />
			<Box width="100%">
				<Button fullWidth variant="contained" type="submit">
					LETS START
				</Button>
			</Box>
		</form>
	);
};
