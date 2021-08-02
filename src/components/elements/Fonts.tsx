import React from 'react';
import styled, {css} from 'styled-components/native';
import {FontsProps, TextStyleProps} from './interface';

export default function Fonts({
  children,
  center = false,
  size = 'medium',
  lineHeight = 'large',
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
        center={center}
      />
    </FontContainer>
  );
}

const FontContainer = styled.View<FontsProps>`
  /* flex: 1; */
  padding-top: ${(props: any) => props.padV};
  padding-bottom: ${(props: any) => props.padV};
  padding-left: ${(props: any) => props.padH};
  padding-right: ${(props: any) => props.padH};
  ${(props: any) =>
    props.center
      ? css`
          justify-content: center;
          align-items: center;
          flex-direction: row;
        `
      : css`
          justify-content: flex-start;
          flex-direction: column;
        `}
`;

const TextStyle = styled.Text<TextStyleProps>`
  font-size: ${(props: any) => props.theme.text[props.size]};
  color: ${(props: any) => props.theme.color[props.fontColor]};
  ${(props: any) =>
    props.lineHeight &&
    css`
      line-height: ${props.theme.lineHeight[props.lineHeight]};
    `}

  ${(props: any) =>
    props.center
      ? css`
          text-align: center;
        `
      : css`
          text-align: left;
        `}

  font-weight: ${(props: any) => (props.bold ? 'bold' : 'normal')};
`;

TextStyle.defaultProps = {
  size: 'medium',
  fontColor: 'black',
};
