import React from 'react';
import {Text, View} from 'react-native';
import {useRecipeNumber} from '../hooks/useAxios';

export default function RecommendPage() {
  const {status, data, isLoading} = useRecipeNumber({
    ingre: [
      '당근',
      '소금',
      '양파',
      '후추',
      '맛살',
      '올리브유',
      '참치',
      '쪽파',
      '설탕',
    ],
  });
  console.log(status, data, isLoading);
  return (
    <View>
      <Text>RecommendPage</Text>
    </View>
  );
}
