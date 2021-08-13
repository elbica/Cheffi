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
