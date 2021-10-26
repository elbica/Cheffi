import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components/native';
import { KakaoLogout, GoogleLogout, clearCache } from '../../api';
import { vh, vw, theme } from '../../assets/styles/theme';
import { RootState, userLogout } from '../../redux/modules';
import Fonts from '../elements/Fonts';
import { GreenCheck, Logout } from '../elements/Images';

export const Setting = ({ isChange, setIsChange, callback }: SettingProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ProfileTabProp>();
  const platform = useSelector((state: RootState) => state.auth.platform);
  const handleLogout = async () => {
    try {
      if (platform === 'kakao') {
        await KakaoLogout();
      } else if (platform === 'google') {
        await GoogleLogout();
      }
      clearCache();
      navigation.reset({
        index: 0,
        routes: [
          {
            name: '홈',
          },
        ],
      });
      dispatch(userLogout());
    } catch (e) {}
  };
  const handleSave = () => {
    if (isChange) callback();
    setIsChange(state => !state);
  };

  return (
    <Position>
      <ChangeWrap onPress={handleSave} isChange={isChange}>
        <CustomCheck isChange={isChange} />
        <Fonts
          children={isChange ? '저장' : '정보 변경'}
          padH={isChange ? '16px' : '8px'}
          padV="2px"
          bold={isChange}
          color={isChange ? 'white' : 'tableGray'}
        />
      </ChangeWrap>
      <LogoutWrap onPress={() => handleLogout()}>
        <Logout />
        <Fonts children="로그아웃" padH="8px" color="tableGray" />
      </LogoutWrap>
    </Position>
  );
};
const LogoutWrap = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  padding: ${1 * vw}px ${3 * vw}px;
  background-color: ${theme.color.carrot + '22'};
  border-radius: 50px;
  flex-direction: row;
  /* width: ${33 * vw}px; */
  height: auto;
  position: absolute;
  align-self: flex-end;
  top: ${16 * vh}px;
  /* margin: 50px 0; */
`;
const CustomCheck = styled(GreenCheck)<{ isChange?: boolean }>`
  width: 32px;
  height: 24px;
  ${({ isChange }) =>
    isChange
      ? css`
          tint-color: ${theme.color.white};
        `
      : css`
          tint-color: ${theme.color.deepGreen};
        `};
`;
const ChangeWrap = styled(LogoutWrap)<{ isChange?: boolean }>`
  background-color: ${({ isChange }) =>
    isChange ? theme.color.vegetable + '99' : theme.color.vegetable + '22'};
  width: ${33 * vw}px;
  left: 0;
  justify-content: flex-start;
`;
const Position = styled.View`
  position: relative;
  height: 100%;
  /* background-color: red; */
`;

interface SettingProps {
  isChange: boolean;
  setIsChange: React.Dispatch<React.SetStateAction<boolean>>;
  callback: Function;
}
