import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { KakaoLogout, GoogleLogout, clearCache } from '../../api';
import { vh, vw, theme } from '../../assets/styles/theme';
import { RootState, userLogout } from '../../redux/modules';
import Fonts from '../elements/Fonts';
import { Logout } from '../elements/Images';

export const Setting = () => {
  const dispatch = useDispatch();
  const platform = useSelector((state: RootState) => state.auth.platform);
  const handleLogout = async () => {
    try {
      if (platform === 'kakao') {
        await KakaoLogout();
      } else if (platform === 'google') {
        await GoogleLogout();
      }
      clearCache();
      dispatch(userLogout());
    } catch (e) {}
  };
  return (
    <Position>
      <LogoutWrap onPress={() => handleLogout()}>
        <Logout />
        <Fonts children="로그아웃" padH="8px" color="tableBlack" />
      </LogoutWrap>
    </Position>
  );
};
const LogoutWrap = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  padding: ${1 * vw}px ${3 * vw}px;
  background-color: ${theme.color.carrot + '33'};
  border-radius: 50px;
  flex-direction: row;
  /* width: ${33 * vw}px; */
  height: auto;
  position: absolute;
  align-self: flex-end;
  top: ${16 * vh}px;
  /* margin: 50px 0; */
`;
const Position = styled.View`
  position: relative;
  height: 100%;
  /* background-color: red; */
`;
