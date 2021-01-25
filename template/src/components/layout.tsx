import * as React from "react";

export const Container: React.FC = (props) => {
	return (
		<div className="container">
			{props.children}
		</div>
	);
};