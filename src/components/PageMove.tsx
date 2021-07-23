import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  children: React.ReactNode;
  goal: string;
  navigation: StackNavigationProp<any>;
}

export function TouchOpacity({children, goal, navigation}: Props) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(goal)}>
      {children}
    </TouchableOpacity>
  );
}
