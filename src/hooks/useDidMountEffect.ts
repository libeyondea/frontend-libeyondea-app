import { EffectCallback, useEffect, useRef } from 'react';

const useDidMountEffect = (effect: EffectCallback): void => {
	const mounted = useRef(false);

	useEffect(() => {
		if (!mounted.current) {
			// didMount
			effect();
			mounted.current = true;
		} else {
			// didUpdate
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useDidMountEffect;
