import { combineReducers } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import auth from './auth';
import form from './form';
import ingredient from './ingredient';
import refriger from './refriger';
import user from './user';

const appReducer = combineReducers({
  auth,
  form,
  ingredient,
  refriger,
  user,
});

const rootReducer = (state: RootState | undefined, action) => {
  if (action.type === 'auth/LOGOUT') {
    // for all keys defined in your persistConfig(s)
    AsyncStorage.removeItem('persist:root');
    state = undefined;
  }
  return appReducer(state, action);
};

export type RootState = ReturnType<typeof appReducer>;
export default rootReducer;
