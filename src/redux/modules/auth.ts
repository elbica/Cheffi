const USER_LOGIN_ACTION = 'auth/LOGIN' as const;
const USER_LOGOUT_ACTION = 'auth/LOGOUT' as const;

const initState = {
  email: null,
  isLogin: false,
};

export const userLogin = (email: any) => ({
  type: USER_LOGIN_ACTION,
  email,
});
export const userLogout = () => ({
  type: USER_LOGOUT_ACTION,
});

type AuthState = {
  email: any;
  isLogin: boolean;
};

type AuthAction = ReturnType<typeof userLogin> | ReturnType<typeof userLogout>;

export default function reducer(
  state: AuthState = initState,
  action: AuthAction,
) {
  switch (action.type) {
    case USER_LOGIN_ACTION:
      return { ...state, email: action.email, isLogin: true };
    case USER_LOGOUT_ACTION:
      return { ...state, email: null, isLogin: false };
    default:
      return state;
  }
}
