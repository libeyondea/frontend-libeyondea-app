import { PaletteMode } from '@mui/material';
import { ReactNode, createContext } from 'react';

import defaultConfig from 'src/config';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { CustomizationProps } from 'src/types/config';

const initialState: CustomizationProps = {
	...defaultConfig,
	onChangeMenuType: () => {},
	onChangePresetColor: () => {},
	onChangeLocale: () => {},
	onChangeContainer: () => {},
	onChangeFontFamily: () => {},
	onChangeBorderRadius: () => {},
	onChangeOutlinedField: () => {}
};

const ConfigContext = createContext(initialState);

type ConfigProviderProps = {
	children: ReactNode;
};

function ConfigProvider({ children }: ConfigProviderProps) {
	const [config, setConfig] = useLocalStorage('berry-config', {
		fontFamily: initialState.fontFamily,
		borderRadius: initialState.borderRadius,
		outlinedFilled: initialState.outlinedFilled,
		navType: initialState.navType,
		presetColor: initialState.presetColor,
		locale: initialState.locale
	});

	const onChangeMenuType = (navType: PaletteMode) => {
		setConfig({
			...config,
			navType
		});
	};

	const onChangePresetColor = (presetColor: string) => {
		setConfig({
			...config,
			presetColor
		});
	};

	const onChangeLocale = (locale: string) => {
		setConfig({
			...config,
			locale
		});
	};

	const onChangeContainer = () => {
		setConfig({
			...config,
			container: !config.container
		});
	};

	const onChangeFontFamily = (fontFamily: string) => {
		setConfig({
			...config,
			fontFamily
		});
	};

	const onChangeBorderRadius = (event: Event, newValue: number | number[]) => {
		setConfig({
			...config,
			borderRadius: newValue as number
		});
	};

	const onChangeOutlinedField = (outlinedFilled: boolean) => {
		setConfig({
			...config,
			outlinedFilled
		});
	};

	return (
		<ConfigContext.Provider
			value={{
				...config,
				onChangeMenuType,
				onChangePresetColor,
				onChangeLocale,
				onChangeContainer,
				onChangeFontFamily,
				onChangeBorderRadius,
				onChangeOutlinedField
			}}
		>
			{children}
		</ConfigContext.Provider>
	);
}

export { ConfigProvider, ConfigContext };
