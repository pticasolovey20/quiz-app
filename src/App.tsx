import { Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import { Box } from "@mui/system";

import { SettingsPage } from "./page/SettingsPage";
import { GamePage } from "./page/GamePage";
import { ResultPage } from "./page/ResultPage";

export const App = () => {
	return (
		<Container>
			<Box
				textAlign="center"
				bgcolor="#fff"
				padding={4}
				borderRadius="20px"
				width="600px"
			>
				<Routes>
					<Route path="/" element={<SettingsPage />} />
					<Route path="/game" element={<GamePage />} />
					<Route path="/result" element={<ResultPage />} />
				</Routes>
			</Box>
		</Container>
	);
};
