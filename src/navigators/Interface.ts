export interface StackNavFactoryScreenName {
  screenName: 'refrigerator' | 'myRecipe' | 'home' | 'recommend' | 'profile';
}

export interface TabScreenDataProps {
  name: string;
  screenName: 'refrigerator' | 'myRecipe' | 'home' | 'recommend' | 'profile';
  iconName: string;
}

export interface IntroNavProps {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export type IntroNavParamList = {
  intro: undefined;
  join1: undefined;
  join2: undefined;
  join3: undefined;
  join4: undefined;
  join5: undefined;
  join6: undefined;
};
