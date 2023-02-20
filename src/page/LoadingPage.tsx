import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

export const LoadingPage = () => {
	return (
		<Box
			minHeight="296px"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<CircularProgress></CircularProgress>
		</Box>
	);
};
