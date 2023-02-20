import { useAppDispatch } from "../hooks/redux-hooks";
import { handleAmountChange } from "../store/slices/questionSlice";

import { Box } from "@mui/system";
import { FormControl, TextField, Typography } from "@mui/material";

export const TextFieldComponent = ({ error }: { error: string }) => {
	const dispatch = useAppDispatch();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		dispatch(handleAmountChange(event.target.value));
	};

	return (
		<Box mb={3} width="100%">
			<FormControl fullWidth size="small">
				<TextField
					onChange={(event) => handleChange(event)}
					variant="outlined"
					label="Amount of Questions"
					type="number"
					size="small"
				></TextField>
				{error && (
					<Typography mt={2} color="red" fontSize={18}>
						{error}
					</Typography>
				)}
			</FormControl>
		</Box>
	);
};
