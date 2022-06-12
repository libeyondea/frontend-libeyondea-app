type SSR = {
	isBrowser: boolean;
	isServer: boolean;
};

const useSsr = (): SSR => {
	const isDOM = typeof window !== 'undefined';

	return {
		isBrowser: isDOM,
		isServer: !isDOM
	};
};

export default useSsr;
