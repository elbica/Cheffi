import React, { useMemo } from 'react';
import { useState } from 'react';
import { emptyRefriger } from '../assets/data/mockUserData';
import { AppWrap } from '../assets/styles/theme';
import { EmptyRefriger } from '../components/__home/MyRefriger';
import { MyIngredient } from '../components/__refriger/MyIngredient';
import { RecommendIngre } from '../components/__refriger/RecommendIngre';
import { useIngredient } from '../hooks/useIngredient';

export default function RefrigerPage() {
  const {
    refriger,
    pushIngredient: push,
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
            push={push}
            setViewModal={setViewModal}
          />
          <AddIngredient
            init={ingredient}
            push={push}
            setViewModal={setViewModal}
            viewModal={viewModal}
          /> */}
          <MyIngredient init={refriger} save={save} push={push} />
        </>
      )}
    </AppWrap>
  );
}
