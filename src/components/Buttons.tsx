import React from 'react';
import {NativeSyntheticEvent, NativeTouchEvent, Text} from 'react-native';
import {TouchButton} from '../assets/styles/theme';

export interface LinkButtonsProps {
  title?: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  width: string;
  height: string;
  margin?: string;
}
export default function LinkButton({
  title,
  onPress,
  width,
  height,
  margin,
}: LinkButtonsProps) {
  return (
    <TouchButton
      width={width}
      height={height}
      onPress={onPress}
      margin={margin}>
      <Text>{title}</Text>
    </TouchButton>
  );
}
