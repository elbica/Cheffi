import {UserLoginAction, UserLogoutAction} from 'react-redux';

export const userLogin = (token: any): UserLoginAction => ({
  type: 'auth/LOGIN',
  token,
});
export const userLogout = (): UserLogoutAction => ({
  type: 'auth/LOGOUT',
});
