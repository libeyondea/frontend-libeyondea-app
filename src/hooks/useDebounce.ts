import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handleDebounce = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handleDebounce);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;
