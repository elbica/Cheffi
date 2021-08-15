const USER_LOGIN_ACTION = 'auth/LOGIN' as const;
const USER_LOGOUT_ACTION = 'auth/LOGOUT' as const;

const initState = {
  token: null,
  isLogin: false,
};

export const userLogin = (token: any) => ({
  type: USER_LOGIN_ACTION,
  token,
});
export const userLogout = () => ({
  type: USER_LOGOUT_ACTION,
});

type AuthState = {
  token: any;
  isLogin: boolean;
};

type AuthAction = ReturnType<typeof userLogin> | ReturnType<typeof userLogout>;

export default function reducer(
  state: AuthState = initState,
  action: AuthAction,
) {
  switch (action.type) {
    case USER_LOGIN_ACTION:
      return { ...state, token: action.token, isLogin: true };
    case USER_LOGOUT_ACTION:
      return { ...state, token: null, isLogin: false };
    default:
      return state;
  }
}
