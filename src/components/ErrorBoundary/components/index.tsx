import React from 'react';

import ButtonComponent from 'src/components/Button/components';
import CardComponent from 'src/components/Card/components';

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
				<div className="h-full w-full fixed overflow-x-hidden overflow-y-auto">
					<div className="min-h-full flex flex-col py-8 sm:p-16">
						<CardComponent className="m-auto max-w-md sm:p-8">
							<h6 className=" font-bold text-center text-gray-800 text-md sm:text-lg">
								<span className="text-red-500">Oops!</span> An error occurred. Please try again later.
							</h6>
							<div className="flex justify-center mt-4">
								<ButtonComponent onClick={() => this.onClickReset()}>Try again</ButtonComponent>
							</div>
						</CardComponent>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
