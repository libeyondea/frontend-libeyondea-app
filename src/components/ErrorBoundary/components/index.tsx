import React from 'react';

import CardComponent from 'src/components/Card/components';

type Props = {
	children: React.ReactNode;
};

type State = {
	error: Error | null;
};

class ErrorBoundary extends React.Component<Props, State> {
	state: State = {
		error: null
	};

	static getDerivedStateFromError(error: Error): State {
		return {
			error: error
		};
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
							<h6 className="text-md font-bold text-center text-gray-800 sm:text-lg">
								<span className="text-red-500">Oops!</span> An error occurred. Please try again later.
							</h6>
						</CardComponent>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
