import React from 'react';
import { AppWrap } from '../assets/styles/theme';
import { ScrapRecipeCount } from '../components/elements/Recipe';
import { EmptyRecipe } from '../components/__myRecipe/EmptyScrap';
import { ScrapRecipes } from '../components/__myRecipe/ScrapRecipes';
import { useRecipeScrap } from '../hooks/useRedux';

export default function MyRecipePage() {
  const scrapIds = useRecipeScrap();

  return (
    <AppWrap>
      {scrapIds.length > 0 ? (
        <>
          <ScrapRecipeCount number={scrapIds.length} />
          <ScrapRecipes scrapIds={scrapIds} />
        </>
      ) : (
        <EmptyRecipe />
      )}
    </AppWrap>
  );
}
