import React, {useCallback, useState} from 'react';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import styled, {css} from 'styled-components/native';
import {TouchButton} from '../../assets/styles/theme';
import Divs, {CenterDivs} from './Divs';
import {CenterTouchOpacity} from '../layout/PageMoveLayout';
import {
  ActionButtonProps,
  ImageButtonProps,
  ImageButtonStyleProps,
  LinkButtonsProps,
  SelectButtonProps,
  SelectButtonStyleProps,
} from './interface';
import Fonts from './Fonts';

export default function LinkButton({
  title,
  onPress,
  width,
  height,
  margin,
  ...rest
}: LinkButtonsProps) {
  return (
    <TouchButton
      width={width}
      height={height}
      onPress={onPress}
      margin={margin}
      {...rest}>
      <Text>{title}</Text>
    </TouchButton>
  );
}
export function ActionButton({
  onPress,
  padV = '0%',
  padH = '0%',
  marginV = '0%',
  marginH = '0%',
  children = null,
  ...rest
}: ActionButtonProps) {
  return (
    <CenterDivs marginV={marginV} marginH={marginH} {...rest}>
      <TouchableOpacity onPress={onPress}>
        <Divs padH={padH} padV={padV}>
          {children}
        </Divs>
      </TouchableOpacity>
    </CenterDivs>
  );
}

export function SelectButton({
  onPress,
  padV = '10px',
  padH = '10px',
  marginV = '0%',
  marginH = '0%',
  children = null,
  size = 'large',
  ...rest
}: SelectButtonProps) {
  const [select, setSelect] = useState(false);
  const handle = useCallback(
    ev => {
      if (!select) onPress(ev);
      setSelect(!select);
    },
    [select, onPress],
  );
  return (
    <SelectButtonContainer
      marginV={marginV}
      marginH={marginH}
      select={select}
      {...rest}>
      <TouchableOpacity onPress={handle}>
        <Fonts
          size={size}
          padH={padH}
          bold={select}
          padV={padV}
          color={select ? 'white' : 'tableGray'}>
          {children}
        </Fonts>
      </TouchableOpacity>
    </SelectButtonContainer>
  );
}

export function ImageButton({
  uri,
  width = '100%',
  height = '100%',
  marginV = '0%',
  marginH = '0%',
  children = null,
  ...rest
}: ImageButtonProps) {
  return (
    <CenterTouchOpacity goal="refrigerator">
      <ImageButtonContainer
        width={width}
        height={height}
        marginV={marginV}
        marginH={marginH}
        {...rest}>
        <ImageBackground
          source={{uri: uri}}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, justifyContent: 'center'}}
          // eslint-disable-next-line react-native/no-inline-styles
          imageStyle={{borderRadius: 16}}
          resizeMode="cover">
          {children}
        </ImageBackground>
      </ImageButtonContainer>
    </CenterTouchOpacity>
  );
}

const ImageButtonContainer = styled.View<ImageButtonStyleProps>`
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
  margin-top: ${(props: any) => props.marginV};
  margin-bottom: ${(props: any) => props.marginV};
  margin-left: ${(props: any) => props.marginH};
  margin-right: ${(props: any) => props.marginH};
  /* flex: 1; */
`;
const SelectButtonContainer = styled(CenterDivs)<SelectButtonStyleProps>`
  border-width: 1px;
  border-radius: 10px;
  ${({select, color, border}) =>
    select
      ? css`
          background-color: ${color};
          border-color: ${border};
        `
      : css`
          background-color: ${color + '33'};
          border-color: ${color + '88'};
        `}
`;
