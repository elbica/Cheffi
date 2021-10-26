import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { AppWrap } from '../assets/styles/theme';
import { Indicator } from '../components/elements/Indicators';
import { PossibleRecipe } from '../components/elements/Recipe';
import { EmptyRecipe } from '../components/__recommend/EmptyRecipe';
import RecipeThumbmail from '../components/__recommend/RecipeThumbnail';
import { useRecipeList } from '../hooks/useRecipe';
import { useRecipeCount } from '../hooks/useRedux';

export default function RecommendPage() {
  const { data, fetchNextPage } = useRecipeList();
  // console.log('recommendPage rendering', data);
  const recipeCount = useRecipeCount();
  const recipe = data?.pages?.reduce<Recipe[]>(
    (acc, cur) => [...acc, ...cur.recipe],
    [],
  );
  const navigation = useNavigation<RecipeInfoNavigationProp>();
  const onPress = useCallback(
    (recipeid: number, platform: Platform, place: number) =>
      navigation.navigate('recipeInfo', { recipeid, platform, place }),
    [navigation],
  );
  return (
    <AppWrap>
      {recipeCount !== undefined && recipeCount > 0 && (
        <PossibleRecipe number={recipeCount} />
      )}
      {data && recipeCount !== undefined && recipeCount > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipe}
          renderItem={({ item, index }) => (
            <RecipeThumbmail {...item} onPress={onPress} place={index} />
          )}
          keyExtractor={item => item.recipeid}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.7}
          removeClippedSubviews
        />
      ) : recipeCount === 0 ? (
        <EmptyRecipe />
      ) : (
        <Indicator />
      )}
    </AppWrap>
  );
}
