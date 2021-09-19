const USER_RECIPECOUNT_ACTION = 'user/RECIPECOUNT' as const;
const USER_PROFILE_ACTION = 'user/PROFILE' as const;
const USER_SCRAPRECIPE_ACTION = 'user/SCRAPRECIPE' as const;
const USER_LIKERECIPE_ACTION = 'user/LIKERECIPE' as const;
const USER_HISTORYRECIPE_ACTION = 'user/HISTORYRECIPE' as const;

const initState = {
  recipeCount: 0,
  nickname: '익명',
  statusMessage: '안녕하세요',
  email: 'email@cheffi.com',
  photo: 's3.url.com',
  dislikeIngredeint: ['민트', '당근'],
  scrapRecipesId: ['1', '2'],
  likeRecipesId: ['3', '4'],
  historyRecipesId: ['5', '6'],
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
export const userProfile = (profile: UserProfile) => ({
  type: USER_PROFILE_ACTION,
  payload: profile,
});
export const userScrapRecipe = (recipeId: string) => ({
  type: USER_SCRAPRECIPE_ACTION,
  payload: { recipeId, key: 'scrapRecipesId' },
});
export const userLikeRecipe = (recipeId: string) => ({
  type: USER_LIKERECIPE_ACTION,
  payload: { recipeId, key: 'likeRecipesId' },
});
export const userHistoryRecipe = (recipeId: string) => ({
  type: USER_HISTORYRECIPE_ACTION,
  payload: { recipeId, key: 'historyRecipesId' },
});

type UserProfile = {
  nickname?: string;
  statusMessage?: string;
  photo?: string;
  dislikeIngredeint?: string[];
};
export type UserState = {
  [key: string]: any;
  recipeCount: number;
  email: string;
  scrapRecipesId: string[];
  likeRecipesId: string[];
  historyRecipesId: string[];
} & UserProfile;
type UserAction = ReturnType<
  | typeof userRecipeCount
  | typeof userProfile
  | typeof userLikeRecipe
  | typeof userHistoryRecipe
  | typeof userScrapRecipe
>;

export default function reducer(
  state: UserState = initState,
  action: UserAction,
) {
  switch (action.type) {
    case USER_RECIPECOUNT_ACTION:
      return { ...state, recipeCount: action.payload };
    case USER_PROFILE_ACTION:
      return { ...state, ...action.payload };
    case USER_HISTORYRECIPE_ACTION:
    case USER_LIKERECIPE_ACTION:
    case USER_SCRAPRECIPE_ACTION:
      return {
        ...state,
        [action.payload.key]: [
          ...state[action.payload.key],
          action.payload.recipeId,
        ],
      };
    default:
      return state;
  }
}
