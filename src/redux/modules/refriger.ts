const REFRIGER_SET_ACTION = 'Refriger/SET' as const;

const initState: RefrigerState = [];

export const setRefriger = (ingredients: RefrigerState) => ({
  type: REFRIGER_SET_ACTION,
  payload: ingredients,
});

type RefrigerState = Category[];
type RefrigerAction = ReturnType<typeof setRefriger>;

export default function reducer(
  state: RefrigerState = initState,
  action: RefrigerAction,
) {
  switch (action.type) {
    case REFRIGER_SET_ACTION:
      return action.payload;
    default:
      return state;
  }
}
