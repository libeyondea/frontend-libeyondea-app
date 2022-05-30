import { useEffect, useState } from 'react';

const useKeyPress = (targetKey: string): boolean => {
	const [keyPressed, setKeyPressed] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === targetKey) {
				setKeyPressed(true);
			}
		};

		const handleKeyUp = (e: KeyboardEvent) => {
			if (e.key === targetKey) {
				setKeyPressed(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [targetKey]);

	return keyPressed;
};

export default useKeyPress;
