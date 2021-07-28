import 'react-redux';
declare module 'react-redux' {
  export type USER_LOGIN_ACTION = 'auth/LOGIN';
  export type USER_LOGOUT_ACTION = 'auth/LOGOUT';

  export type UserLoginAction = {
    type: USER_LOGIN_ACTION;
    token: any;
  };
  export type UserLogoutAction = {
    type: USER_LOGOUT_ACTION;
  };

  export type AuthAction = {
    type: USER_LOGIN_ACTION | USER_LOGOUT_ACTION;
    token?: any;
  };
  export type RootState = {
    auth: {
      isLogin: boolean;
      token: any;
    };
  };
}
