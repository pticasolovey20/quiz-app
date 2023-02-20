import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { fetchQuestions, scoreChangeAction } from "../store/slices/questionSlice";
import { useNavigate } from "react-router-dom";
import { decode } from "html-entities";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { ProgressBar } from "../components/ProgressBar";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

const getRandomInt = (max: number): number => {
	return Math.floor(Math.random() * Math.floor(max));
};

export const GamePage = () => {
	const [questionIndex, setQuestionIndex] = useState(0);
	const [options, setOptions] = useState<string[]>([]);

	const {
		questions,
		loading,
		fetchError,
		score,
		question_category,
		question_difficulty,
		question_type,
		amount_of_questions,
	} = useAppSelector((state) => state.questionSlice);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(
			fetchQuestions({
				question_category,
				question_difficulty,
				question_type,
				amount_of_questions,
			})
		);
	}, [question_category, question_difficulty, question_type, amount_of_questions, dispatch]);

	const percentage = ((questionIndex / questions.length) * 100).toFixed(0);

	useEffect(() => {
		if (questions.length) {
			const question = questions[questionIndex];

			let answers = [...question.incorrect_answers];
			answers.splice(
				getRandomInt(question.incorrect_answers.length),
				0,
				question.correct_answer
			);

			setOptions(answers);
		}
	}, [questions, questionIndex]);

	if (loading) {
		return <LoadingPage />;
	}

	if (fetchError) {
		return <ErrorPage />;
	}

	const onClickVariant = (event: React.MouseEvent<HTMLButtonElement>) => {
		const question = questions[questionIndex];

		const target = event.target as HTMLButtonElement;
		if (target.textContent === question.correct_answer) {
			dispatch(scoreChangeAction(score + 1));
		}

		if (questionIndex + 1 < questions.length) {
			setQuestionIndex(questionIndex + 1);
		} else {
			navigate("/result");
		}
	};

	const onClickClean = () => {
		dispatch(scoreChangeAction(0));
		setQuestionIndex(0);
	};

	return (
		<Box>
			<Typography mb={2} variant="h5">
				{decode(questions && questions[questionIndex].question)}
			</Typography>
			<ProgressBar percentage={percentage} />
			{options.map((option: string, index: number) => (
				<Box mb={3} key={index}>
					<Button
						onClick={(event) => onClickVariant(event)}
						variant="contained"
						fullWidth
					>
						{decode(option)}
					</Button>
				</Box>
			))}
			<Box>
				<Button variant="outlined" fullWidth color="error" onClick={onClickClean}>
					CLEAN ALL
				</Button>
			</Box>
		</Box>
	);
};
