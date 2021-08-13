const INGREDIENT_SET_ACTION = 'ingredient/SET' as const;

const initState: IngredientState = [];

export const setIngredient = (ingredients: IngredientState) => ({
  type: INGREDIENT_SET_ACTION,
  payload: ingredients,
});

type IngredientState = Category[];

type IngredientAction = ReturnType<typeof setIngredient>;

export default function reducer(
  state: IngredientState = initState,
  action: IngredientAction,
) {
  switch (action.type) {
    case INGREDIENT_SET_ACTION:
      return action.payload;
    default:
      return state;
  }
}
