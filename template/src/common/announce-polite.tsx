import * as React from "react";
import Typography, { TypographyProps } from "@material-ui/core/Typography";

interface AnnouncePoliteProps extends TypographyProps {
	text: string;
}

export const AnnouncePolite: React.FC<AnnouncePoliteProps> = ({text, ...props}) => {
	const [delayedText, setDelayedText] = React.useState("");
	React.useEffect(() => { setTimeout(() => setDelayedText(text), 500); }, [text]);

	return (
		<>
			<Typography aria-live="polite" variant="srOnly" {...props}>{delayedText}</Typography>
			{props.children}
		</>
	);
};

