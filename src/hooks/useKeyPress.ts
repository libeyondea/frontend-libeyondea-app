import { useState } from 'react';
import useEventListener from './useEventListener';

const useKeyPress = (targetKey: string): boolean => {
	const [keyPressed, setKeyPressed] = useState(false);

	useEventListener('keydown', (event) => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				setKeyPressed(true);
			}
		};
		handleKeyDown(event);
	});

	useEventListener('keyup', (event) => {
		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				setKeyPressed(false);
			}
		};
		handleKeyUp(event);
	});

	return keyPressed;
};

export default useKeyPress;
