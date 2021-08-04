const FORM_SET_ACTION = 'form/SET' as const;
const FORM_GET_ACTION = 'form/GET' as const;

const initState = {};

export const formSet = (data: object) => ({
  type: FORM_SET_ACTION,
  payload: data,
});
export const formGet = () => ({
  type: FORM_GET_ACTION,
});

type FormState = {
  nickname?: string;
  profile?: any;
  problems?: string[];
  like?: string[];
  dislike?: string[];
};
type FormAction = ReturnType<typeof formSet> | ReturnType<typeof formGet>;

export default function reducer(
  state: FormState = initState,
  action: FormAction,
) {
  switch (action.type) {
    case FORM_SET_ACTION:
      return {...state, ...action.payload};
    case FORM_GET_ACTION:
      return {...state};
    default:
      return state;
  }
}
