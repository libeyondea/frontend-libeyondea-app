import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import store from 'store';
import RootRouter from './router';
import 'styles/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';

type Props = {};

const Root: React.FC<Props> = () => {
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
