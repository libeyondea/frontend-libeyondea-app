import * as createTheme from '@mui/material/styles';

import { customShadows } from 'src/themes/shadows';

declare module '@mui/material/styles' {
	interface ThemeOptions {
		customShadows?: customShadows;
		customization?: TypographyOptions | ((palette: Palette) => TypographyOptions);
		darkTextSecondary?: string;
		textDark?: string;
		darkTextPrimary?: string;
		grey500?: string;
	}

	interface Theme {
		customShadows: customShadows;
		customization: Typography;
		darkTextSecondary: string;
		textDark: string;
		darkTextPrimary: string;
		grey500: string;
	}
}
