import { EffectCallback, useEffect, useRef } from 'react';

const useDidMountEffect = (effect: EffectCallback): void => {
	const mounted = useRef(false);

	useEffect(() => {
		if (!mounted.current) {
			effect();
			mounted.current = true;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useDidMountEffect;
