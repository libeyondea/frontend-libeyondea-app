import { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './assets/styles/global.scss';
import Routes from './routes';
import AuthControl from './routes/guard/AuthControl';
import store from './store';

const App = () => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AuthControl>
					<Fragment>
						<Routes />
						<ToastContainer />
					</Fragment>
				</AuthControl>
			</BrowserRouter>
		</Provider>
	);
};

export default App;
