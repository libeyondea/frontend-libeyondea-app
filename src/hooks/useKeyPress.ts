import { useEffect, useState } from 'react';

const useKeyPress = (targetKey: string): boolean => {
	const [keyPressed, setKeyPressed] = useState(false);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				setKeyPressed(true);
			}
		};

		const handleKeyUp = (event: KeyboardEvent) => {
			if (event.key === targetKey) {
				setKeyPressed(false);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		document.addEventListener('keyup', handleKeyUp);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.removeEventListener('keyup', handleKeyUp);
		};
	}, [targetKey]);

	return keyPressed;
};

export default useKeyPress;
