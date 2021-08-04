import {combineReducers} from 'redux';
import auth from './auth';
import form from './form';

const rootReducer = combineReducers({
  auth,
  form,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
