const USER_LOGIN_ACTION = 'auth/LOGIN' as const;
const USER_LOGOUT_ACTION = 'auth/LOGOUT' as const;
const USER_APPLE_ACTION = 'auth/APPLE' as const;

const initState = {
  isLogin: false,
  platform: 'null',
  appleToken: undefined,
};

export const userLogin = (payload: {
  isLogin: boolean;
  platform?: string;
}) => ({
  type: USER_LOGIN_ACTION,
  payload,
});
export const userLogout = () => ({
  type: USER_LOGOUT_ACTION,
});
export const userSetAppleToken = (token: string) => ({
  type: USER_APPLE_ACTION,
  payload: token,
});

type AuthState = {
  isLogin: boolean;
  platform: string;
  appleToken?: string;
};

type AuthAction =
  | ReturnType<typeof userLogin>
  | ReturnType<typeof userLogout>
  | ReturnType<typeof userSetAppleToken>;

export default function reducer(
  state: AuthState = initState,
  action: AuthAction,
) {
  switch (action.type) {
    case USER_LOGIN_ACTION:
      return { ...state, ...action.payload };
    case USER_LOGOUT_ACTION:
      return { ...state, isLogin: false, platform: 'null' };
    case USER_APPLE_ACTION:
      return { ...state, appleToken: action.payload };
    default:
      return state;
  }
}
