import React from 'react';
import { useState } from 'react';
import { AppWrap } from '../assets/styles/theme';
import AddIngredient from '../components/__refriger/AddIngredient';
import MyIngredient from '../components/__refriger/MyIngredient';
import { useIngredient } from '../hooks/useIngredient';

export default function RefrigerPage() {
  const {
    refriger,
    ingredient,
    completeIngredient: complete,
    saveIngredient: save,
  } = useIngredient();
  const [viewModal, setViewModal] = useState(false);
  // console.log('refriger render');
  return (
    <AppWrap>
      <MyIngredient
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
      />
    </AppWrap>
  );
}
