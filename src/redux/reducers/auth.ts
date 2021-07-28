import {AuthAction} from 'react-redux';

const initState = {
  token: null,
  isLogin: false,
};

export default function auth(state: any = initState, action: AuthAction) {
  switch (action.type) {
    case 'auth/LOGIN':
      return {...state, token: action.token, isLogin: true};
    case 'auth/LOGOUT':
      return {...state, token: null, isLogin: false};
    default:
      return state;
  }
}
