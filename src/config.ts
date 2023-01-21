// types
import { ConfigProps } from './types/config';

export const FIREBASE_API = {
	apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
	authDomain: 'berry-material-react.firebaseapp.com',
	projectId: 'berry-material-react',
	storageBucket: 'berry-material-react.appspot.com',
	messagingSenderId: '901111229354',
	appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
	measurementId: 'G-MGJHSL8XW3'
};

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
// like '/berry-material-react/react/default'
export const BASE_PATH = '';

export const DASHBOARD_PATH = '/sample-page';

const config: ConfigProps = {
	fontFamily: `'Roboto', sans-serif`,
	borderRadius: 8,
	outlinedFilled: true,
	navType: 'light', // light, dark
	presetColor: 'theme1', // default, theme1, theme2, theme3, theme4, theme5, theme6
	locale: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
	container: false
};

export default config;
