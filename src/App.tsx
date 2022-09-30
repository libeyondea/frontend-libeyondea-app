import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import Routes from './routes';
import store from './store';
import './styles/global.scss';

const App = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={Routes} />
			<ToastContainer />
		</Provider>
	);
};

export default App;
