const USER_RECIPECOUNT_ACTION = 'user/RECIPECOUNT' as const;
const USER_PROFILE_ACTION = 'user/PROFILE' as const;
const USER_SCRAPRECIPE_ACTION = 'user/SCRAPRECIPE' as const;
const USER_LIKERECIPE_ACTION = 'user/LIKERECIPE' as const;
const USER_HISTORYRECIPE_ACTION = 'user/HISTORYRECIPE' as const;
const USER_INIT_ACTION = 'user/INIT' as const;

const initState = {
  recipeCount: 0,
  nickname: '익명',
  statusMessage: '안녕하세요',
  photo: 's3.url.com',
  dislikeIngredient: ['민트', '당근'],
  scrapRecipesId: [],
  likeRecipesId: [],
  historyRecipesId: [],
};

/**
 *
 * @param recipeCount 만들 수 있는 레시피의 개수를 async storage에 저장
 * @returns 액션 객체
 *
 */
export const userInit = (init: UserState) => ({
  type: USER_INIT_ACTION,
  payload: init,
});
export const userRecipeCount = (recipeCount: number) => ({
  type: USER_RECIPECOUNT_ACTION,
  payload: recipeCount,
});
export const userProfile = (profile: UserProfile) => ({
  type: USER_PROFILE_ACTION,
  payload: profile,
});

export const userRecipeHistory = (recipe: number) => ({
  type: USER_HISTORYRECIPE_ACTION,
  payload: recipe,
});

export const userRecipeScrap = (recipe: number) => ({
  type: USER_SCRAPRECIPE_ACTION,
  payload: recipe,
});

type UserProfile = {
  nickname?: string;
  statusMessage?: string;
  photo?: string;
  dislikeIngredient?: string[];
};
export type UserState = UserInfo;
type UserAction = ReturnType<
  | typeof userRecipeCount
  | typeof userProfile
  | typeof userRecipeHistory
  | typeof userRecipeScrap
  | typeof userInit
>;

export default function reducer(
  state: UserState = initState,
  action: UserAction,
) {
  switch (action.type) {
    case USER_RECIPECOUNT_ACTION:
      return { ...state, recipeCount: action.payload };
    case USER_PROFILE_ACTION:
    case USER_INIT_ACTION:
      return { ...state, ...action.payload };
    case USER_HISTORYRECIPE_ACTION:
      const newHistoryState = state.historyRecipesId
        .filter(id => id !== action.payload)
        .slice(0, 49);
      return {
        ...state,
        historyRecipesId: [action.payload, ...newHistoryState],
      };
    case USER_SCRAPRECIPE_ACTION:
      const exist = state.scrapRecipesId.includes(action.payload);
      const newScrapState = exist
        ? {
            ...state,
            scrapRecipesId: state.scrapRecipesId.filter(
              old => old !== action.payload,
            ),
          }
        : {
            ...state,
            scrapRecipesId: [action.payload, ...state.scrapRecipesId],
          };
      return newScrapState;

    default:
      return state;
  }
}
