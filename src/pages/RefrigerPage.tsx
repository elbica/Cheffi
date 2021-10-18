import React, { useMemo } from 'react';
import { emptyRefriger } from '../assets/data/mockUserData';
import { AppWrap } from '../assets/styles/theme';
import { EmptyRefriger } from '../components/__home/MyRefriger';
import { MyIngredient } from '../components/__refriger/MyIngredient';
import { RecommendIngre } from '../components/__refriger/RecommendIngre';
import { useModifyIngredient } from '../hooks/useIngredient';

export default function RefrigerPage() {
  const {
    refriger,
    pushIngredient: push,
    saveIngredient: save,
  } = useModifyIngredient();
  const empty = useMemo(
    () => JSON.stringify(refriger) === JSON.stringify(emptyRefriger),
    [refriger],
  );

  return (
    <AppWrap>
      {empty ? (
        <>
          <EmptyRefriger />
          <RecommendIngre save={save} />
        </>
      ) : (
        <MyIngredient init={refriger} save={save} push={push} />
      )}
    </AppWrap>
  );
}
