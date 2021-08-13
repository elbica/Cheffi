import {combineReducers} from 'redux';
import auth from './auth';
import form from './form';
import ingredient from './ingredient';
import refriger from './refriger';

const rootReducer = combineReducers({
  auth,
  form,
  ingredient,
  refriger,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
