import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ChipButton } from '../elements/Buttons';
import Divs from '../elements/Divs';
import Fonts from '../elements/Fonts';
import categoryData from '../../assets/data/ingreCategory';
import { vh } from '../../assets/styles/theme';

const OneDepthCategory: OneDepthCategory[] = [
  '떡/곡류',
  '콩/묵/두부',
  '과일류',
  '음료/주류',
];

/**
 * @description
 * custom user defined type gaurd
 */
const isOneDepth = (category: any): category is OneDepthCategory =>
  OneDepthCategory.includes(category as OneDepthCategory);

const mainCategory = Object.keys(categoryData) as MainCategory[];
const ingredient = Object.values(categoryData).reduce(
  (acc, cur) => ({ ...acc, ...cur }),
  {},
) as { [key: string]: string[] };
const subCategory: { [key: string]: string[] } = mainCategory.reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: isOneDepth(cur)
      ? Object.values(categoryData[cur])
      : Object.keys(categoryData[cur]),
  }),
  {},
);

export const MainCategory = React.memo(
  ({ setCategory, notAll }: MainCategoryProps) => {
    return (
      <Divs height="auto" marginV="15px">
        <Fonts children="카테고리" bold />
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mainCategory.map((category, idx) =>
            !notAll || (notAll && category !== '전체') ? (
              <ChipButton
                key={idx}
                color="tableBlack"
                children={category}
                onPress={() => setCategory(category, 'main')}
              />
            ) : null,
          )}
        </ScrollView>
      </Divs>
    );
  },
);

export const SubCategory = ({ setCategory, pickMain }: SubCategoryProps) => {
  return (
    <Divs height="auto" marginV="15px">
      <Fonts children="카테고리" bold />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {subCategory[pickMain].map((category, idx) => (
          <ChipButton
            key={idx}
            color="tableBlack"
            children={category}
            onPress={() => setCategory(category as MainCategory, 'sub')}
          />
        ))}
      </ScrollView>
    </Divs>
  );
};

export const ContentCategory = ({
  handlePrev,
  pickCategory,
  setCategory,
  handleAdd,
}: ContentCategoryProps) => {
  const calculContent = () => {
    if (isOneDepth(pickCategory.main)) {
      return subCategory[pickCategory.main].map((ingre, idx) => (
        <ChipButton
          key={idx}
          color="light"
          children={ingre}
          onPress={() => handleAdd(ingre, pickCategory.main)}
        />
      ));
    } else if (pickCategory.sub) {
      return ingredient[pickCategory.sub].map((ingre, idx) => (
        <ChipButton
          key={idx}
          color="light"
          children={ingre}
          onPress={() => handleAdd(ingre, pickCategory.main)}
        />
      ));
    } else {
      return subCategory[pickCategory.main].map((category, idx) => (
        <ChipButton
          key={idx}
          color="tableGray"
          children={category}
          onPress={() => setCategory(category, 'sub')}
        />
      ));
    }
  };

  return (
    <Divs height={`${42 * vh}px`}>
      <Fonts children="재료 선택" bold />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}>
        {calculContent()}
      </ScrollView>
      {pickCategory.sub && (
        <ChipButton
          color="deepGreen"
          onPress={handlePrev}
          width="auto"
          children="이전"
        />
      )}
    </Divs>
  );
};

interface MainCategoryProps {
  setCategory:
    | React.Dispatch<React.SetStateAction<MainCategory>>
    | ((param: string, key: 'main' | 'sub') => void);
  notAll?: boolean;
}
interface SubCategoryProps extends MainCategoryProps {
  pickMain: string;
}
interface ContentCategoryProps {
  handlePrev: () => void;
  pickCategory: {
    main: MainCategory;
    sub: string | null;
  };
  setCategory: (param: string, key: 'main' | 'sub') => void;
  handleAdd: (ingredient: string, title: MainCategory) => void;
}
