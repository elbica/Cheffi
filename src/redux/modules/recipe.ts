const RECIPE_COMPLETE_ACTION = 'recipe/COMPLETE' as const;

const initState: RecipeState = {
  complete: [],
};

export const toggleRecipeComplete = (recipeid: number) => ({
  type: RECIPE_COMPLETE_ACTION,
  payload: recipeid,
});

type RecipeState = {
  complete: number[];
};

type RecipeAction = ReturnType<typeof toggleRecipeComplete>;

export default function reducer(
  state: RecipeState = initState,
  action: RecipeAction,
) {
  switch (action.type) {
    case RECIPE_COMPLETE_ACTION:
      const isExist = state.complete.includes(action.payload);
      const newState = isExist
        ? {
            ...state,
            complete: state.complete.filter(old => old !== action.payload),
          }
        : { ...state, complete: [...state.complete, action.payload] };
      return newState;
    default:
      return state;
  }
}
