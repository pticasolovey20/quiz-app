import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { handleAmountChange, handleScoreChange } from "../store/slices/questionSlice";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

export const ResultPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { score, amount_of_questions } = useAppSelector((state) => state.questionSlice);

	const handleBack = () => {
		dispatch(handleScoreChange(0));
		dispatch(handleAmountChange("5"));
		navigate("/");
	};

	return (
		<Box display="flex" flexDirection="column" gap={2} alignItems="center">
			<img
				src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png"
				alt="result"
				style={{ width: "150px" }}
			/>
			<Typography fontSize={20} fontWeight="600">
				You guessed <span>{score}</span> out of <span>{amount_of_questions}</span>
			</Typography>
			<Button variant="outlined" onClick={handleBack} size="large">
				TRY AGAIN
			</Button>
		</Box>
	);
};
