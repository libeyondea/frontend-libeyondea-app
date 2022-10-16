import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './assets/styles/global.scss';
import Routes from './routes';
import AccessControl from './routes/AccessControl';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<AccessControl>
				<Fragment>
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
					<ToastContainer />
				</Fragment>
			</AccessControl>
		</Provider>
	);
};

export default App;
