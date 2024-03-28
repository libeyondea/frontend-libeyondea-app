import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
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
	devTools: import.meta.env.NODE_ENV !== 'production',
	preloadedState
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useDispatch = () => useAppDispatch<AppDispatch>();

export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default store;
