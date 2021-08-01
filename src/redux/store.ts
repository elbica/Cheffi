import {createStore} from 'redux';
// redux-persist wrappers
import {persistStore, persistReducer} from 'redux-persist';
// the local storage we'll be using to persist data
import AsyncStorage from '@react-native-community/async-storage';
// redux-persist merge level
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// root reducer - reducers/index.js
import rootReducer from './modules/index';
// the component we'll use to wrap our component tree

import {composeWithDevTools} from 'redux-devtools-extension';

const persistConfig: any = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(enhancedReducer, composeWithDevTools());
export const persistor = persistStore(store);
