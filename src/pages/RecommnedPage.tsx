import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { AppWrap } from '../assets/styles/theme';
import { ChipButton } from '../components/elements/Buttons';
import { Indicator } from '../components/elements/Indicators';
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
  const navigation = useNavigation();
  const onPress = useCallback(
    (recipeid: number, platform: string) =>
      navigation.navigate('recipeInfo', { recipeid, platform }),
    [navigation],
  );
  return (
    <AppWrap>
      <ChipButton
        color="light"
        children={`${recipeCount} 개의 레시피를 만들 수 있어요!`}
      />
      {data ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={recipe}
          renderItem={({ item }) => (
            <RecipeThumbmail {...item} onPress={onPress} />
          )}
          keyExtractor={item => item.recipeid}
          onEndReached={() => fetchNextPage()}
          onEndReachedThreshold={0.5}
          removeClippedSubviews
        />
      ) : (
        <Indicator />
      )}
    </AppWrap>
  );
}
