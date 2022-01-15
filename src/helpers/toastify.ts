import { toast, ToastOptions } from 'react-toastify';

const toastifyConfig: ToastOptions = {
	position: toast.POSITION.BOTTOM_RIGHT,
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	rtl: false,
	pauseOnFocusLoss: true,
	draggable: true,
	pauseOnHover: false
};

const toastify = {
	info: (message: string) => toast.info(message, toastifyConfig),
	success: (message: string) => toast.success(message, toastifyConfig),
	error: (message: string = 'An error occurred. Please try again later.') => toast.error(message, toastifyConfig),
	warn: (message: string) => toast.info(message, toastifyConfig)
};

export default toastify;
