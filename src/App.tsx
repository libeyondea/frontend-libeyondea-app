import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import './assets/styles/global.scss';
import Routes from './routes';
import AccessControl from './routes/guard/AccessControl';
import store from './store';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false
		}
	}
});

const App = () => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AccessControl>
					<BrowserRouter>
						<Routes />
					</BrowserRouter>
				</AccessControl>
				<ToastContainer />
			</QueryClientProvider>
		</Provider>
	);
};

export default App;
