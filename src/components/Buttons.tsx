import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {ButtonsProps} from './Interface/CompInterface';

const ButtonStyle = styled.TouchableHighlight`
  width: ${(props: ButtonsProps) => props.width};
  height: ${(props: ButtonsProps) => props.height};
  background-color: red;
`;

export default function LinkButton({
  title,
  onPress,
  width,
  height,
}: ButtonsProps) {
  return (
    <ButtonStyle width={width} height={height} onPress={onPress}>
      <Text>{title}</Text>
    </ButtonStyle>
  );
}
