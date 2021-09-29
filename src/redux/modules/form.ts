const FORM_SET_ACTION = 'form/SET' as const;

const initState = {};

export const formSet = (data: object) => ({
  type: FORM_SET_ACTION,
  payload: data,
});

type FormState = {
  nickname?: string;
  photo?: any;
  problems?: string[];
  likeRecipesId?: string[];
  dislikeIngredient?: string[];
};
type FormAction = ReturnType<typeof formSet>;

export default function reducer(
  state: FormState = initState,
  action: FormAction,
) {
  switch (action.type) {
    case FORM_SET_ACTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
