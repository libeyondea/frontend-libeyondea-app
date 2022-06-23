import { useEffect, useRef } from 'react';

const useOnceEffect = (effect: React.EffectCallback): void => {
	const destroyFunc = useRef<void | any>();
	const calledOnce = useRef(false);
	const renderAfterCalled = useRef(false);

	if (calledOnce.current) {
		renderAfterCalled.current = true;
	}

	useEffect(() => {
		if (calledOnce.current) {
			return;
		}

		calledOnce.current = true;
		destroyFunc.current = effect();

		return () => {
			if (!renderAfterCalled.current) {
				return;
			}

			if (destroyFunc.current) {
				destroyFunc.current();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};

export default useOnceEffect;
