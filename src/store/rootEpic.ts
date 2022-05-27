import { combineEpics } from 'redux-observable';
import * as appEpic from './app/epics';
import * as authEpic from './auth/epics';
import * as userEpic from './user/epics';

export default combineEpics(...Object.values(appEpic), ...Object.values(authEpic), ...Object.values(userEpic));
