import { combineReducers } from 'redux';
import auth from './auth';
import form from './form';
import ingredient from './ingredient';
import refriger from './refriger';
import user from './user';

const rootReducer = combineReducers({
  auth,
  form,
  ingredient,
  refriger,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
