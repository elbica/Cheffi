import { ImageSourcePropType } from 'react-native';

interface TabIconsTypes {
  [index: string]: {
    active: ImageSourcePropType;
    default: ImageSourcePropType;
  };
  home: {
    active: ImageSourcePropType;
    default: ImageSourcePropType;
  };
  myRecipe: {
    active: ImageSourcePropType;
    default: ImageSourcePropType;
  };
  profile: {
    active: ImageSourcePropType;
    default: ImageSourcePropType;
  };
  recommend: {
    active: ImageSourcePropType;
    default: ImageSourcePropType;
  };
  refrigerator: {
    active: ImageSourcePropType;
    default: ImageSourcePropType;
  };
}

interface HomeIconTypes {
  [key: string]: ImageSourcePropType;
  homeIcon1: ImageSourcePropType;
  homeIcon2: ImageSourcePropType;
  homeIcon3: ImageSourcePropType;
}

export const icons: TabIconsTypes = {
  home: {
    active: require('./homeActive.png'),
    default: require('./homeActive.png'),
  },
  myRecipe: {
    active: require('./myRecipeActive.png'),
    default: require('./myRecipeActive.png'),
  },
  profile: {
    active: require('./profileActive.png'),
    default: require('./profileDefault.png'),
  },
  recommend: {
    active: require('./recommendActive.png'),
    default: require('./recommendDefault.png'),
  },
  refrigerator: {
    active: require('./refrigeratorActive.png'),
    default: require('./refrigeratorDefault.png'),
  },
};
export const homeIcons: HomeIconTypes = {
  homeIcon1: require('./homeIcon1.png'),
  homeIcon2: require('./homeIcon2.png'),
  homeIcon3: require('./homeIcon3.png'),
};

export const LoginButtons = {
  kakao: require('./kakao.png'),
  google: require('./google.png'),
};
