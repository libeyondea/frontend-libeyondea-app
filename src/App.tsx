import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './assets/styles/global.scss';
import Routes from './routes';
import AccessControl from './routes/guard/AccessControl';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<AccessControl>
				<Routes />
			</AccessControl>
			<ToastContainer />
		</Provider>
	);
};

export default App;
