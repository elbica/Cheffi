declare interface Ingredient {
  name: string;
  category: MainCategory;
}
declare interface Category {
  title: MainCategory;
  data: string[];
}

declare type OneDepthCategory =
  | '떡/곡류'
  | '콩/묵/두부'
  | '과일류'
  | '음료/주류';

declare type TwoDepthCategory =
  | '빵/면/만두류'
  | '채소류'
  | '육류'
  | '계란/유제품'
  | '수산/건어물'
  | '조미료/양념/육수'
  | '가공식품'
  | '기름/향신료/가루'
  | '초콜릿/과자/견과류';

declare type MainCategory =
  | TwoDepthCategory
  | OneDepthCategory
  | '전체'
  | '추천'
  | '검색 결과';

declare interface Recipe {
  scrap?: number;
  time?: string;
  calories?: number;
  recipeid: number;
  title?: string;
  platform: 'haemuk' | 'mangae' | 'dummy';
  size?: number;
  difficulty?: string;
}
declare interface RecipeInfo extends Recipe {
  ingredient: { [key: string]: string }[];
}

declare interface AuthResult {
  auth: {
    newUser: boolean;
    token: string;
    platform: string;
  };
  info: {
    recipeCount: number;
    nickname: string;
    statusMessage: string;
    photo: string;
    dislikeIngredient: string[];
    scrapRecipesId: string[];
    likeRecipesId: string[];
    historyRecipesId: string[];
  };
  refriger: { title: MainCategory; data: string[] }[];
}

declare interface Ingredients {
  ingre: string[];
}

declare type Refriger = Category[];
declare type FormInfo = {
  nickname?: string;
  photo?: any;
  problems?: string[];
  likeRecipesId?: string[];
  dislikeIngredient?: string[];
};

type RouteProp<T, K> = import('@react-navigation/core').RouteProp<T, K>;
type StackNavigationProp<T, K> =
  import('@react-navigation/stack').StackNavigationProp<T, K>;

type RootStackParamList = {
  myRecipe: undefined;
  home: undefined;
  recommend: undefined;
  profile: undefined;
  refrigerator: undefined;
  recipeInfo: { recipeid: number; platform: 'haemuk' | 'mangae' | 'dummy' };
  addIngredient: { category: MainCategory };
};
type RecipeInfoRouteProp = RouteProp<RootStackParamList, 'recipeInfo'>;
type RecipeInfoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'recipeInfo'
>;
type AddIngredientRouteProp = RouteProp<RootStackParamList, 'addIngredient'>;
