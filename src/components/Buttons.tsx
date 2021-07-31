import React from 'react';
import {
  ImageBackground,
  NativeSyntheticEvent,
  NativeTouchEvent,
  Text,
} from 'react-native';
import styled from 'styled-components/native';
import {TouchButton} from '../assets/styles/theme';
import {CenterTouchOpacity} from './layout/PageMoveLayout';

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

export function ImageButton({
  uri,
  width = '100%',
  height = '100%',
  marginV = '0%',
  marginH = '0%',
  children = null,
}: ImageButtonProps) {
  return (
    <CenterTouchOpacity goal="refrigerator">
      <ImageButtonContainer
        width={width}
        height={height}
        marginV={marginV}
        marginH={marginH}>
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

const ImageButtonContainer = styled.View`
  width: ${(props: any) => props.width};
  height: ${(props: any) => props.height};
  margin-top: ${(props: any) => props.marginV};
  margin-bottom: ${(props: any) => props.marginV};
  margin-left: ${(props: any) => props.marginH};
  margin-right: ${(props: any) => props.marginH};
  flex: 1;
`;
