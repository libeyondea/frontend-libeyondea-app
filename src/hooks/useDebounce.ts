import { useEffect, useState } from 'react';

const useDebounce = <T>(value: T, wait: number = 666): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const handleDebounce = setTimeout(() => {
			setDebouncedValue(value);
		}, wait);

		return () => {
			clearTimeout(handleDebounce);
		};
	}, [value, wait]);

	return debouncedValue;
};

export default useDebounce;
