declare module '@mui/material/styles/createPalette' {
	export interface PaletteColor {
		100: string;
		200: string;
		300: string;
		400: string;
		500: string;
		600: string;
		700: string;
		800: string;
		900: string;
	}

	export interface TypeText {
		dark: string;
		hint: string;
	}

	export interface PaletteOptions {
		orange?: PaletteColorOptions;
		dark?: PaletteColorOptions;
		icon?: IconPaletteColorOptions;
	}
	export interface Palette {
		orange: PaletteColor;
		dark: PaletteColor;
		icon: IconPaletteColor;
	}
}

export default function createPalette(palette: PaletteOptions): Palette;
