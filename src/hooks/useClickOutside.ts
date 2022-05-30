import useEventListener from './useEventListener';

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
	ref: React.RefObject<T>,
	handler: (event: MouseEvent) => void,
	mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void => {
	useEventListener(mouseEvent, (event) => {
		if (!ref.current || ref.current.contains(event.target as Node)) {
			return;
		}
		handler(event);
	});
};

export default useOnClickOutside;
