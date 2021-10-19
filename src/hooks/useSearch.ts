import { useState, useCallback } from 'react';
import { debounce, getMainCategory, getSearchResult } from '../api';

export const useIngredientSearch = () => {
  const [search, setSearch] = useState<string[]>([]);
  const onChangeText = useCallback(
    debounce((text: string) => {
      const result = getSearchResult(text);
      setSearch(result);
    }, 500),
    [setSearch],
  );
  const mapWithCategory = useCallback(() => {
    const ret: Ingredient[] = search.map(item => ({
      category: getMainCategory(item),
      name: item,
    }));
    return ret;
  }, [search]);
  return { results: search, onChangeText, mapWithCategory };
};
