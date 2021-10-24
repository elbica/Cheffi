import React from 'react';
import { AppWrap } from '../assets/styles/theme';
import { HistoryRecipeCount } from '../components/elements/Recipe';
import { EmptyRecipe } from '../components/__myRecipe/EmptyScrap';
import { HistoryRecipes } from '../components/__myRecipe/HistoryRecipe';
import { useRecipeHistory } from '../hooks/useRedux';

export default function HistoryRecipePage() {
  const historyIds = useRecipeHistory();

  return (
    <AppWrap>
      {historyIds.length > 0 ? (
        <>
          <HistoryRecipeCount number={historyIds.length} />
          <HistoryRecipes scrapIds={historyIds} />
        </>
      ) : (
        <EmptyRecipe />
      )}
    </AppWrap>
  );
}
