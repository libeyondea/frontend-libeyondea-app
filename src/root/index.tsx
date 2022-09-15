import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import rootRouter from './router';
import store from 'src/store';
import 'src/styles/global.scss';

const Root = () => {
	return (
		<Provider store={store}>
			<RouterProvider router={rootRouter} />
			<ToastContainer />
		</Provider>
	);
};

export default Root;
