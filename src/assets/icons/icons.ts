import {ImageSourcePropType} from 'react-native';

interface iconsTypes {
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

export const icons: iconsTypes = {
  home: {
    active: require('./homeActive.png'),
    default: require('./homeDefault.png'),
  },
  myRecipe: {
    active: require('./myRecipeActive.png'),
    default: require('./myRecipeDefault.png'),
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
