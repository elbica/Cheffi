const USER_LOGIN_ACTION = 'auth/LOGIN';
const USER_LOGOUT_ACTION = 'auth/LOGOUT';

const initState = {
  token: null,
  isLogin: false,
};

export type UserLoginAction = {
  type: 'auth/LOGIN';
  token: any;
};
export type UserLogoutAction = {
  type: 'auth/LOGOUT';
};

export type AuthAction = {
  type: 'auth/LOGIN' | 'auth/LOGOUT';
  token?: any;
};

export const userLogin = (token: any): UserLoginAction => ({
  type: USER_LOGIN_ACTION,
  token,
});
export const userLogout = (): UserLogoutAction => ({
  type: USER_LOGOUT_ACTION,
});

export default function reducer(state: any = initState, action: AuthAction) {
  switch (action.type) {
    case USER_LOGIN_ACTION:
      return {...state, token: action.token, isLogin: true};
    case USER_LOGOUT_ACTION:
      return {...state, token: null, isLogin: false};
    default:
      return state;
  }
}
