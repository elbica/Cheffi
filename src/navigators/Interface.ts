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
