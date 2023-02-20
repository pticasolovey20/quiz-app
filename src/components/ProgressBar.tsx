import React from "react";

export const ProgressBar = ({ percentage }: { percentage: string }) => {
	return (
		<div className="progress-wrapper">
			<div
				style={{ width: `${percentage}%` }}
				className="progress-bar"
			></div>
		</div>
	);
};
