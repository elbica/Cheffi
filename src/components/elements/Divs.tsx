import React from 'react';
import styled, {css} from 'styled-components/native';
import {DivsProps} from './interface';

export default function Divs({children, ...rest}: DivsProps) {
  return <DivsContainer {...rest}>{children}</DivsContainer>;
}
export function CenterDivs({children, ...rest}: DivsProps) {
  return <CenterDivsContainer {...rest}>{children}</CenterDivsContainer>;
}
export function RowDivs({
  align = false,
  children,
  ...rest
}: {align?: boolean} & DivsProps) {
  return (
    <RowDivsContainer align={align} {...rest}>
      {children}
    </RowDivsContainer>
  );
}
const DivsContainer = styled.View<DivsProps>`
  /* flex: 1; */
  padding-top: ${props => props.padV || '0px'};
  padding-bottom: ${props => props.padV || '0px'};
  padding-left: ${props => props.padH || '0px'};
  padding-right: ${props => props.padH || '0px'};
  margin-top: ${props => props.marginV || '0px'};
  margin-bottom: ${props => props.marginV || '0px'};
  margin-left: ${props => props.marginH || '0px'};
  margin-right: ${props => props.marginH || '0px'};
  width: ${({width}) => width || '100%'};
  height: ${({height}) => height || '100%'};
`;
const RowDivsContainer = styled(DivsContainer)<{align?: boolean}>`
  flex-direction: row;
  /* justify-content: space-between; */
  /* justify-content: ${({align}) =>
    align ? 'flex-align' : 'space-between'}; */
  ${props =>
    props.align
      ? css`
          justify-content: flex-start;
        `
      : css`
          justify-content: space-between;
        `}
  align-items: center;
`;
const CenterDivsContainer = styled(DivsContainer)`
  /* background-color: black; */
  justify-content: center;
  align-items: center;
`;
