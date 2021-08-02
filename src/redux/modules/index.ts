import {combineReducers} from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
  auth,
});

export type RootState = {
  auth: {
    isLogin: boolean;
    token: any;
  };
};
export default rootReducer;
