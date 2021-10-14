import { useState, useCallback } from 'react';
import { debounce, getMainCategory, getSearchResult } from '../api';
import { InputEvent } from '../components/elements/interface';

export const useIngredientSearch = () => {
  const [search, setSearch] = useState(['']);
  const onChangeText = useCallback(
    debounce((e: InputEvent) => {
      const result = getSearchResult(e.nativeEvent.text);
      setSearch(result);
    }, 500),
    [],
  );
  const mapWithCategory = useCallback(() => {
    const ret: Ingredient[] = search.map(item => ({
      category: getMainCategory(item),
      name: item,
    }));
    return ret;
  }, []);
  return { result: search, onChangeText, mapWithCategory };
};
