const RECIPE_COMPLETE_ACTION = 'recipe/COMPLETE' as const;

const initState: RecipeState = {
  complete: [],
};

export const userRecipeComplete = (recipeid: number) => ({
  type: RECIPE_COMPLETE_ACTION,
  payload: recipeid,
});

type RecipeState = {
  complete: number[];
};

type RecipeAction = ReturnType<typeof userRecipeComplete>;

export default function reducer(
  state: RecipeState = initState,
  action: RecipeAction,
) {
  switch (action.type) {
    case RECIPE_COMPLETE_ACTION:
      const newArray = state.complete.filter(old => old !== action.payload);
      return { ...state, complete: [...newArray, action.payload] };
    default:
      return state;
  }
}
