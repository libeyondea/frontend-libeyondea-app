import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './rootEpic';
import rootReducer from './rootReducer';
import config from 'src/config';

const epicMiddleware = createEpicMiddleware();

const middlewares = [
	createLogger({
		predicate: () => config.LOGGER.REDUX
	}),
	epicMiddleware
];

const preloadedState = {};

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
	devTools: process.env.NODE_ENV !== 'production',
	preloadedState
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
