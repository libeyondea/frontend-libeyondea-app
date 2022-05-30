import { useEffect } from 'react';
import useIsFirstRender from './useIsFirstRender';

const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList): void => {
	const isFirst = useIsFirstRender();

	useEffect(() => {
		if (!isFirst) {
			effect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useUpdateEffect;
