import { useState } from 'react';

const useErrorBoundary = (givenError?: unknown): ((error: unknown) => void) => {
	const [error, setError] = useState<unknown>(null);

	if (givenError != null) {
		throw givenError;
	} else if (error != null) {
		throw error;
	}

	return setError;
};

export default useErrorBoundary;
