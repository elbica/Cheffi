import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';
import { useScrapList } from '../../hooks/useRecipe';
import { Indicator } from '../elements/Indicators';
import RecipeThumbmail from '../__recommend/RecipeThumbnail';

export const ScrapRecipes = ({ scrapIds }: { scrapIds: number[] }) => {
  const { data, fetchNextPage } = useScrapList(scrapIds);
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
  return data ? (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={recipe}
      renderItem={({ item, index }) => (
        <RecipeThumbmail {...item} onPress={onPress} place={index} />
      )}
      keyExtractor={item => item.recipeid.toString()}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={0.5}
      removeClippedSubviews
    />
  ) : (
    <Indicator />
  );
};
