import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { Theme, ThemeOptions, ThemeProvider, createTheme } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { ReactNode, useMemo } from 'react';

import componentStyleOverrides from './compStyleOverride';
import Palette from './palette';
import customShadows from './shadows';
import Typography from './typography';
import useConfig from 'src/hooks/useConfig';
import { CustomShadowProps } from 'src/types/default-theme';

interface Props {
	children: ReactNode;
}

const ThemeCustomization = ({ children }: Props) => {
	const { borderRadius, fontFamily, navType, outlinedFilled, presetColor } = useConfig();

	const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

	const themeTypography: TypographyOptions = useMemo<TypographyOptions>(() => Typography(theme, borderRadius, fontFamily), [theme, borderRadius, fontFamily]);

	const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(() => customShadows(navType, theme), [navType, theme]);

	const themeOptions: ThemeOptions = useMemo(
		() => ({
			palette: theme.palette,
			mixins: {
				toolbar: {
					minHeight: '48px',
					padding: '16px',
					'@media (min-width: 600px)': {
						minHeight: '48px'
					}
				}
			},
			typography: themeTypography,
			customShadows: themeCustomShadows
		}),
		[theme, themeCustomShadows, themeTypography]
	);

	const themes: Theme = createTheme(themeOptions);

	themes.components = useMemo(() => componentStyleOverrides(themes, borderRadius, outlinedFilled), [themes, borderRadius, outlinedFilled]);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={themes}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default ThemeCustomization;
