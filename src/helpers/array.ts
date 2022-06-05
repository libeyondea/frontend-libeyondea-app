export const insertItemIntoArray = <T extends { id: number; [field: string]: any }>(arr: T[], item: T, index = 0): T[] => {
	const arrClone = [...arr];
	arrClone.splice(index, 0, item);
	return arrClone;
};

export const updateArrayItemById = <T extends { id: number; [field: string]: any }>(arr: T[], itemId: number, fields: T): T[] => {
	const arrClone = [...arr];
	const item = arrClone.find((i) => i.id === itemId);
	if (item) {
		const itemIndex = arrClone.indexOf(item);
		arrClone.splice(itemIndex, 1, { ...item, ...fields });
	}
	return arrClone;
};

export const deleteArrayItemById = <T extends { id: number; [field: string]: any }>(arr: T[], itemId: number): T[] => {
	const arrClone = [...arr];
	const item = arrClone.find((i) => i.id === itemId);
	if (item) {
		const itemIndex = arrClone.indexOf(item);
		arrClone.splice(itemIndex, 1);
	}
	return arrClone;
};
