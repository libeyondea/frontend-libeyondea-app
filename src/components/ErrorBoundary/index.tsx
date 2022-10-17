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
				<div className="bg-base-200 h-full w-full fixed overflow-x-hidden overflow-y-auto">
					<div className="min-h-full flex flex-col py-8 sm:p-16">
						<Card className="m-auto max-w-md">
							<h6 className="font-bold text-error text-center">An error occurred. Please try again later.</h6>
							<div className="flex justify-center mt-4">
								<Button onClick={() => this.onClickReset()}>Try again</Button>
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
