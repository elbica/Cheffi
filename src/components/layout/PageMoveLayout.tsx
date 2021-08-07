import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ViewStyle} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  children: React.ReactNode;
  goal: string;
  onPress(): void;
}
const centerStyle: ViewStyle = {
  // flex: ,
  // height: 100,
  // backgroundColor: 'yellow',
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
export function CenterTouchOpacity({children, onPress = () => {}}: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={centerStyle}>
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
