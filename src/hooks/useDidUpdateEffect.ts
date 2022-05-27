import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

const useDidUpdateEffect = (effect: EffectCallback, deps: DependencyList): void => {
	const mounted = useRef(false);

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
		} else {
			effect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useDidUpdateEffect;
