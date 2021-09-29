declare interface Ingredient {
  name: string;
  category: string;
}
declare interface Category {
  title: MainCategory;
  data: string[];
}

declare type MainCategory =
  | '전체'
  | '떡/밥/곡류'
  | '빵/면/만두류'
  | '과일류'
  | '채소류'
  | '육류'
  | '계란/유제품'
  | '수산/건어물'
  | '장/양념/소스류'
  | '음료/주류'
  | '가공식품'
  | '향신료/가루류'
  | '초콜릿/과자/견과류';

declare interface Recipe {
  scrap: string;
  time: string;
  calories: string;
  id: string;
  title: string;
}
declare interface RecipeInfo extends Recipe {
  ingredient: string[];
}

//error 속성 삭제, 실패 시 http status 4xx로 변경 및 에러 메세지 보내기
declare interface AuthResult {
  auth: {
    newUser: boolean;
    token: string; //암호화를 하면 프론트에서 따로 저쟝해야 함
    platform: string;
  };
  info: {
    recipeCount: number; //만들 수 있는 레시피 개수
    nickname: string;
    statusMessage: string;
    photo: string;
    dislikeIngredient: string[];
    scrapRecipesId: string[];
    likeRecipesId: string[];
    historyRecipesId: string[];
  };
  refriger: { title: string; data: string[] }[];
}

declare interface Ingredients {
  ingre: string[];
}

declare type Refriger = Category[];
