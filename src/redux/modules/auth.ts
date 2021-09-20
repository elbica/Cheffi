const USER_LOGIN_ACTION = 'auth/LOGIN' as const;
const USER_LOGOUT_ACTION = 'auth/LOGOUT' as const;

const initState = {
  token: null,
  isLogin: false,
};

export const userLogin = (payload: { isLogin: boolean; token?: string }) => ({
  type: USER_LOGIN_ACTION,
  payload,
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
      return { ...state, ...action.payload };
    case USER_LOGOUT_ACTION:
      return { ...state, token: null, isLogin: false };
    default:
      return state;
  }
}
