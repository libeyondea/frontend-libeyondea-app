import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';
import Root from './root';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'styles/index.scss';
import 'react-toastify/dist/ReactToastify.min.css';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<Root />
				<ToastContainer />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
