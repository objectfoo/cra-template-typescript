import * as React from "react";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { LoadingService, LoadingState } from "./loading-service";
import { useObservable } from "../use-observable";
import { AnnouncePolite } from "../announce-polite";

export interface LoadingProps {
	ShowLoadScreenAfterTime?: number;
	IsLoading: boolean;
	LoadErrorMessage: string;
	RenderChildren: () => JSX.Element;
	RenderError?: () => JSX.Element;
}

export const Loading: React.FC<LoadingProps> = (props) => {
	const { RenderError, RenderChildren } = props;
	const service = useService(props.IsLoading, props.LoadErrorMessage);
	const processState = useObservable(service.State);
	const errorMessage = useObservable(service.LoadErrorMessage);
	const a11yMessage = useObservable(service.A11yMessage);
	const content = React.useMemo(() => {
		switch(processState) {
			case LoadingState.Loading:
				return <LoadingSpinner  />;
			case LoadingState.Loaded:
				return RenderChildren();
			case LoadingState.Error:
				return <LoadingError errorMessage={errorMessage} RenderError={RenderError} />;
			default:
				throw new Error(`Unknown ProcessState: ${processState}`);
		}
	}, [RenderChildren, processState, errorMessage, RenderError])

	return <AnnouncePolite text={a11yMessage}>{content}</AnnouncePolite>;
};

function useService(isLoading: boolean, errorMessage: string): LoadingService {
	const [ service ] = React.useState(() => new LoadingService());
	service.SyncDomState(isLoading, errorMessage);
	return service;
}

const LoadingError: React.FC<{
	errorMessage: string;
	RenderError?: () => JSX.Element;
}> = ({ RenderError, errorMessage }) => (
	<>
		<Typography>{errorMessage}</Typography>
		{typeof RenderError === "function" && RenderError()}
	</>
);

const DelayRender: React.FC<{ delay?: number; }> = ({delay = 300, children}) => {
	const [isVisible, setVisible] = React.useState(false);
	React.useEffect(() => {
		const timer = setTimeout(() => setVisible(true), delay);
		return () => window.clearTimeout(timer);
	}, [delay]);
	return <>{isVisible ? children : null}</>;
};

const LoadingSpinner: React.FC = () => (
	<Box
		display="flex"
		flexDirection="column"
		alignItems="center"
		justifyContent="center"
		minHeight={320}
		py={2}
		px={1}
	>
		<DelayRender>
			<CircularProgress size={120} thickness={1.5} />
		</DelayRender>
	</Box>
);
