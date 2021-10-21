import { useState, useCallback } from 'react';
import { debounce, getSearchResult } from '../api';

export const useIngredientSearch = () => {
  const [search, setSearch] = useState<string[]>([]);
  const onChangeText = useCallback(
    debounce((text: string) => {
      const result = getSearchResult(text);
      setSearch(result);
    }, 500),
    [setSearch],
  );

  return { results: search, onChangeText };
};
