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
  | '검색';

declare type Platform = 'haemuk' | 'mangae' | 'dummy';
declare interface Recipe {
  _id: string;
  scrap: number | null;
  time?: string;
  calories: number | null;
  recipeid: number;
  title?: string;
  platform: Platform;
  size?: number;
  difficulty?: string;
}
declare interface RecipeInfo extends Recipe {
  ingredient: {
    name: string;
    amount: string;
    replace: string[];
    replaceAmount: string[];
  }[];
  summary: string;
  isReplace: boolean;
}

declare interface AuthResult {
  auth: {
    newUser: boolean;
    token: string;
    platform: string;
  };
  info: UserInfo;
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
  likeRecipesId?: number[];
  dislikeIngredient?: string[];
  ingredients?: string[];
};
declare type UserInfo = {
  recipeCount: number;
  nickname: string;
  statusMessage: string;
  photo: string;
  dislikeIngredient: string[];
  scrapRecipesId: number[];
  likeRecipesId?: number[];
  historyRecipesId: number[];
};

type RouteProp<T, K> = import('@react-navigation/core').RouteProp<T, K>;
type StackNavigationProp<T, K> =
  import('@react-navigation/stack').StackNavigationProp<T, K>;
type TabNavigationProp<T, K> =
  import('@react-navigation/bottom-tabs').BottomTabNavigationProp<T, K>;

type RootStackParamList = {
  myRecipe: undefined;
  home: undefined;
  recommend: undefined;
  profile: undefined;
  history: undefined;
  refrigerator: undefined;
  recipeInfo: {
    recipeid: number;
    platform: Platform;
    place: number;
  };
  addIngredient: { category: MainCategory };
};
type RecipeInfoRouteProp = RouteProp<RootStackParamList, 'recipeInfo'>;
type RecipeInfoNavigationProp = StackNavigationProp<
  RootStackParamList,
  'recipeInfo'
>;
type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'profile'>;
type AddIngredientRouteProp = RouteProp<RootStackParamList, 'addIngredient'>;
type AddIngredientNavProp = StackNavigationProp<
  RootStackParamList,
  'addIngredient'
>;

type IntroNavParamList = {
  intro: undefined;
  join1: undefined;
  join2: undefined;
  join3: undefined;
  join4: undefined;
  'join4-1': undefined;
  join5: undefined;
  join6: { param: string };
};
type TabNavParamList = {
  '내 냉장고': undefined;
  '내 레시피': undefined;
  홈: undefined;
  추천레시피: undefined;
  마이페이지: undefined;
};
type RecommendTabProp = TabNavigationProp<TabNavParamList, '추천레시피'>;
type RefrigerTabProp = TabNavigationProp<TabNavParamList, '내 냉장고'>;
type ProfileTabProp = TabNavigationProp<TabNavParamList, '마이페이지'>;
type Join6RouteProp = RouteProp<IntroNavParamList, 'join6'>;
