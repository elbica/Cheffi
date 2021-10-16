import React, { useCallback, useMemo } from 'react';
import { useState } from 'react';
import { MOCK_RECOMMEND_INGRE } from '../assets/data/mockRecipeData';
import { emptyRefriger } from '../assets/data/mockUserData';
import { AppWrap } from '../assets/styles/theme';
import { EmptyRefriger } from '../components/__home/MyRefriger';
import AddIngredient from '../components/__refriger/AddIngredient';
import MyIngredient from '../components/__refriger/MyIngredient';
import { RecommendButton } from '../components/__refriger/RecommendBtn';
import { RecommendIngre } from '../components/__refriger/RecommendIngre';
import { useIngredient } from '../hooks/useIngredient';
import { useRecipeNumber } from '../hooks/useRecipe';

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

  const [recommends, setRecommends] = useState<Ingredient[]>([]);
  const convertRefriger = convertToRefriger(recommends);
  const { data } = useRecipeNumber(convertRefriger);
  const handleIngredient = useCallback(
    (ingredient: Ingredient) => {
      const { name } = ingredient;
      const isInclude = recommends.find(item => item.name === name);
      if (isInclude)
        setRecommends(recommends.filter(item => item.name !== name));
      else setRecommends([...recommends, ingredient]);
    },
    [recommends],
  );
  const handleRefriger = useCallback(() => {
    save(convertRefriger, data as number);
    setRecommends([]);
  }, [data, convertRefriger]);

  return (
    <AppWrap>
      {empty ? (
        <>
          <EmptyRefriger />
          <RecommendIngre
            ingredients={MOCK_RECOMMEND_INGRE}
            onPress={handleIngredient}
          />
          <RecommendButton
            number={recommends.length}
            onPress={handleRefriger}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </AppWrap>
  );
}

const convertToRefriger = (ingredients: Ingredient[]) => {
  /**
   * object.assign, spread syntax는 얕은 복사이다.
   */
  let ret = JSON.parse(JSON.stringify(emptyRefriger)) as Refriger;
  ingredients.map(ingredient => {
    const isExist = ret.findIndex(
      refriger => refriger.title === ingredient.category,
    );
    if (isExist === -1) {
      ret.push({ title: ingredient.category, data: [ingredient.name] });
    } else {
      if (!ret[isExist].data.includes(ingredient.name))
        ret[isExist].data.push(ingredient.name);
    }
  });
  return ret;
};
