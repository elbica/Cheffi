import { IngredientArray, mappingCategory } from '../assets/data/ingreCategory';

export function deepCopyObject(obj: any) {
  let clone: { [key: string]: any } = {};
  for (let key in obj) {
    if (typeof obj[key] == 'object' && obj[key] != null) {
      clone[key] = deepCopyObject(obj[key]);
    } else {
      clone[key] = obj[key];
    }
  }

  return clone;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => ReturnType<T> {
  let inDebounce: NodeJS.Timeout; // timeoutID

  return ((...args: any) => {
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func(...args), delay);
  }) as (...args: Parameters<T>) => ReturnType<T>;
}

/**
 * @param input 사용자가 입력한 query
 * @return query로 시작하는 연관 검색어 배열
 *
 * @description
 * javascript object는 hash table로 구현된다.
 * 모든 연산이 상수 복잡도를 가진다.
 *
 * 각 재료들마다의 substring을 key로, 연관 검색어 배열을 value로 하여 큰 객체를 구성한다.
 * 전처리를 한 번만 하면, 이 후 상수 복잡도로 결과값을 찾을 수 있다.
 * -> 구현이 어렵다. 추후 최적화 작업 때 하자
 *
 * 또는 재료들을 순회하면서 연관 검색어들을 찾는 방법이 있다.
 * 매 query마다 선형 복잡도 * 문자열 길이 만큼의 연산이 든다.
 *
 * 또한 연관 검색어들마다 대분류를 mapping 해야되는데,
 * 이 역시 모든 재료를 순회해서 key값을 찾아야 한다.
 * 전처리를 미리 해놓으면 상수 복잡도로 해결할 수 있다.
 * -> mappingCategory로 해결
 */
export const getSearchResult = (input: string) => {
  if (input.length < 2) return [];
  return IngredientArray.filter(ingredient => ingredient.includes(input));
};

export const getMainCategory = (ingredient: string) =>
  mappingCategory[ingredient] as MainCategory;

const OneDepthCategory: OneDepthCategory[] = [
  '떡/곡류',
  '콩/묵/두부',
  '과일류',
  '음료/주류',
];

/**
 * @description
 * custom user defined type gaurd
 */
export const isOneDepth = (category: any): category is OneDepthCategory =>
  OneDepthCategory.includes(category as OneDepthCategory);
