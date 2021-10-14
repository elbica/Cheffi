const REFRIGER_SET_ACTION = 'Refriger/SET' as const;
const REFRIGER_ADD_ACTION = 'Refriger/ADD' as const;

const initState: RefrigerState = [];

export const setRefriger = (ingredients: RefrigerState) => ({
  type: REFRIGER_SET_ACTION,
  payload: ingredients,
});

export const addRefriger = (ingredients: Ingredient[]) => ({
  type: REFRIGER_ADD_ACTION,
  payload: ingredients,
});

type RefrigerState = Category[];
type RefrigerAction = ReturnType<typeof setRefriger | typeof addRefriger>;

export default function reducer(
  state: RefrigerState = initState,
  action: RefrigerAction,
) {
  switch (action.type) {
    case REFRIGER_SET_ACTION:
      return action.payload;
    case REFRIGER_ADD_ACTION:
      let newState = [...state];
      action.payload.map(ingredient => {
        newState.map(
          category =>
            category.title === ingredient.category &&
            category.data.push(ingredient.name),
        );
      });
      return newState;
    default:
      return state;
  }
}
