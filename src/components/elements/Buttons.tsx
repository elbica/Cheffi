import React from 'react';
import {
  ImageBackground,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import {TouchButton} from '../../assets/styles/theme';
import Divs, {CenterDivs} from './Divs';
import {CenterTouchOpacity} from '../layout/PageMoveLayout';

export interface LinkButtonsProps {
  title?: string;
  onPress: (ev: NativeSyntheticEvent<NativeTouchEvent>) => void;
  width: string;
  height: string;
  margin?: string;
}
interface ImageButtonProps {
  uri: string;
  width?: string;
  height?: string;
  marginV?: string;
  marginH?: string;
  children?: React.ReactNode;
}
interface ActionButtonProps {
  onPress(ev: NativeSyntheticEvent<NativeTouchEvent>): void;
  padV?: string;
  padH?: string;
  marginV?: string;
  marginH?: string;
  children?: React.ReactNode;
}
interface ImageButtonStyleProps {
  width?: string;
  height?: string;
  marginV?: string;
  marginH?: string;
}
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
