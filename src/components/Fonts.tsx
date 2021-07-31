import {Font} from '../assets/styles/theme';
import React from 'react';
import {Colors, Sizes} from 'styled-components';
import styled, {css} from 'styled-components/native';

interface FontsProps {
  children: string;
  center?: boolean;
  size?: Sizes;
  lineHeight?: Sizes;
  padH?: string;
  padV?: string;
  color?: Colors;
  bold?: boolean;
}

export default function Fonts({
  children,
  center = false,
  size = 'medium',
  lineHeight = 'medium',
  padH = '0%',
  padV = '0%',
  color = 'black',
  bold = false,
}: FontsProps) {
  return (
    <FontContainer padV={padV} padH={padH} center={center}>
      <Font size={size} lineHeight={lineHeight} fontColor={color} bold={bold}>
        {children}
      </Font>
    </FontContainer>
  );
}

const FontContainer = styled.View`
  /* flex: 1; */
  padding-top: ${(props: any) => props.padV};
  padding-bottom: ${(props: any) => props.padV};
  padding-left: ${(props: any) => props.padH};
  padding-right: ${(props: any) => props.padH};
  /* margin-top: ${(props: any) => props.marginV};
  margin-bottom: ${(props: any) => props.marginV};
  margin-left: ${(props: any) => props.marginH};
  margin-right: ${(props: any) => props.marginH}; */
  ${(props: any) =>
    props.center
      ? css`
          justify-content: center;
          flex-direction: row;
        `
      : css`
          justify-content: flex-start;
          flex-direction: column;
        `}
`;
