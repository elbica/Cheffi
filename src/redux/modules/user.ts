/**
 *
 * @todo
 * 유저의 닉네임, 상태 메세지 등 정보를 async storage에 저장해야 한다
 *
 */

const USER_RECIPECOUNT_ACTION = 'user/RECIPECOUNT' as const;

const initState = {
  recipeCount: 0,
  nickname: '익명',
  statusMessage: '안녕하세요',
};

/**
 *
 * @param recipeCount 만들 수 있는 레시피의 개수를 async storage에 저장
 * @returns 액션 객체
 *
 */
export const userRecipeCount = (recipeCount: number) => ({
  type: USER_RECIPECOUNT_ACTION,
  payload: recipeCount,
});

type UserState = {
  recipeCount: number;
  nickname: string;
  statusMessage: string;
};

type UserAction = ReturnType<typeof userRecipeCount>;

export default function reducer(
  state: UserState = initState,
  action: UserAction,
) {
  switch (action.type) {
    case USER_RECIPECOUNT_ACTION:
      return { ...state, recipeCount: action.payload };
    default:
      return state;
  }
}
