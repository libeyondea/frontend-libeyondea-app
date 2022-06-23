import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import RootRouter from './router';
import store from 'src/store';
import 'src/styles/index.scss';

const Root = () => {
	return (
		<Provider store={store}>
			<Router>
				<RootRouter />
				<ToastContainer />
			</Router>
		</Provider>
	);
};

export default Root;
