import React from 'react';

import Button from 'src/components/Button';
import Card from 'src/components/Card';

type Props = {
	children: React.ReactNode;
};

type State = {
	error: Error | null;
};

const initialState: State = {
	error: null
};

class ErrorBoundary extends React.Component<Props, State> {
	state: State = initialState;

	static getDerivedStateFromError(error: Error): State {
		return {
			error: error
		};
	}

	onClickReset() {
		this.setState(initialState);
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('Uncaught error:', error, errorInfo);
	}

	render() {
		if (this.state.error) {
			return (
				<div className="center-screen">
					<div className="center-screen-content">
						<Card>
							<h6 className="text-center font-bold text-error">An error occurred. Please try again later.</h6>
							<div className="mt-4 flex justify-center">
								<Button color="primary" onClick={() => this.onClickReset()}>
									Try again
								</Button>
							</div>
						</Card>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
