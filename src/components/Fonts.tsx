import React from 'react';
import {Colors, Sizes} from 'styled-components';
import styled, {css} from 'styled-components/native';

interface FontsProps {
  children: string;
  center?: boolean;
  size?: Sizes;
  lineHeight?: Sizes | 'none';
  padH?: string;
  padV?: string;
  color?: Colors;
  bold?: boolean;
}

export default function Fonts({
  children,
  center = false,
  size = 'medium',
  lineHeight,
  padH = '0%',
  padV = '0%',
  color = 'black',
  bold = false,
}: FontsProps) {
  return (
    <FontContainer padV={padV} padH={padH} center={center}>
      <TextStyle
        size={size}
        lineHeight={lineHeight}
        fontColor={color}
        bold={bold}
        children={children}
      />
    </FontContainer>
  );
}

const FontContainer = styled.View`
  /* flex: 1; */
  padding-top: ${(props: any) => props.padV};
  padding-bottom: ${(props: any) => props.padV};
  padding-left: ${(props: any) => props.padH};
  padding-right: ${(props: any) => props.padH};
  ${(props: any) =>
    props.center
      ? css`
          justify-content: center;
          /* flex-direction: row; */
        `
      : css`
          justify-content: flex-start;
          flex-direction: column;
        `}
`;

const TextStyle = styled.Text`
  font-size: ${(props: any) => props.theme.text[props.size]};
  color: ${(props: any) => props.theme.color[props.fontColor]};
  ${(props: any) =>
    props.lineHeight &&
    css`
      line-height: ${props.theme.lineHeight[props.lineHeight]};
    `}

  font-weight: ${(props: any) => (props.bold ? 'bold' : 'normal')};
`;

TextStyle.defaultProps = {
  size: 'medium',
  fontColor: 'black',
};
