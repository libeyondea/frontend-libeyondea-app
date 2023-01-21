import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import { useRoutes } from 'react-router-dom';

export default function ThemeRoutes() {
	return useRoutes([LoginRoutes, MainRoutes]);
}
