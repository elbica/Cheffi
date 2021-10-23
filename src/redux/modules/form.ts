const FORM_SET_ACTION = 'form/SET' as const;
const FORM_INIT_ACTION = 'form/INIT' as const;

const initState = {};

export const formInit = () => ({
  type: FORM_INIT_ACTION,
  payload: {},
});
export const formSet = (data: object) => ({
  type: FORM_SET_ACTION,
  payload: data,
});

type FormState = {
  nickname?: string;
  photo?: any;
  problems?: string[];
  likeRecipesId?: string[];
  ingredients?: string[];
  dislikeIngredient?: string[];
};
type FormAction = ReturnType<typeof formSet | typeof formInit>;

export default function reducer(
  state: FormState = initState,
  action: FormAction,
) {
  switch (action.type) {
    case FORM_SET_ACTION:
      return { ...state, ...action.payload };
    case FORM_INIT_ACTION:
      return { ...action.payload };
    default:
      return state;
  }
}
