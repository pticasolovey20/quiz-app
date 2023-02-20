import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export const ErrorPage = () => {
	return (
		<Box
			minHeight="296px"
			display="flex"
			justifyContent="center"
			alignItems="center"
		>
			<Typography variant="h6" color="red" fontWeight={600}>
				Some Went Wrong!
			</Typography>
		</Box>
	);
};
