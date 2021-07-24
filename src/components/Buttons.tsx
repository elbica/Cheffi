import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import {ButtonsProps} from './Interface/CompInterface';

const ButtonStyle = styled.TouchableHighlight`
  /* width: ${(props: ButtonsProps) => props.width}; */
  width: ${(props: ButtonsProps) => props.width};
  height: ${(props: ButtonsProps) => props.height};
  background-color: red;
  justify-content: center;
  align-items: center;
  margin: ${(props: ButtonsProps) => (props.margin ? props.margin : 0)};
`;

export default function LinkButton({
  title,
  onPress,
  width,
  height,
  margin,
}: ButtonsProps) {
  return (
    <ButtonStyle
      width={width}
      height={height}
      onPress={onPress}
      margin={margin}>
      <Text>{title}</Text>
    </ButtonStyle>
  );
}
