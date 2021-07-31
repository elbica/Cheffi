import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
  goal: string;
  // navigation: StackNavigationProp<any>;
  route?: any;
}
const centerStyle: ViewStyle = {
  flex: 0.1,
  justifyContent: 'center',
  alignItems: 'center',
  // position: 'absolute',
};
const leftStyle: ViewStyle = {
  flex: 0.1,
  // justifyContent: 'flex-start',
  alignItems: 'flex-start',
  // position: 'absolute',
};
export function CenterTouchOpacity({children, goal}: Props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(goal)}
      style={centerStyle}>
      {children}
    </TouchableOpacity>
  );
}
export function LeftTouchOpacity({children, goal}: Props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(goal)}
      style={leftStyle}>
      {children}
    </TouchableOpacity>
  );
}
