import { EffectCallback, useEffect } from 'react';

const useWillUnmountEffect = (effect: EffectCallback): void => {
	useEffect(() => {
		return () => {
			effect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useWillUnmountEffect;
