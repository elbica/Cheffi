import React, { useMemo } from 'react';
import { useState } from 'react';
import { emptyRefriger } from '../assets/data/mockUserData';
import { AppWrap } from '../assets/styles/theme';
import { EmptyRefriger } from '../components/__home/MyRefriger';
import AddIngredient from '../components/__refriger/AddIngredient';
import MyIngredient, {
  RefacMyIngredient,
} from '../components/__refriger/MyIngredient';
import { RecommendIngre } from '../components/__refriger/RecommendIngre';
import { useIngredient } from '../hooks/useIngredient';

export default function RefrigerPage() {
  const {
    refriger,
    ingredient,
    completeIngredient: complete,
    saveIngredient: save,
  } = useIngredient();
  const [viewModal, setViewModal] = useState(false);
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
        <>
          {/* <MyIngredient
            init={refriger}
            now={ingredient}
            save={save}
            complete={complete}
            setViewModal={setViewModal}
          />
          <AddIngredient
            init={ingredient}
            complete={complete}
            setViewModal={setViewModal}
            viewModal={viewModal}
          /> */}
          <RefacMyIngredient init={refriger} save={save} complete={complete} />
        </>
      )}
    </AppWrap>
  );
}
