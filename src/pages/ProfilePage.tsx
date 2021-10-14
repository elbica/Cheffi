import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KakaoLogout, GoogleLogout } from '../api';
import { queryClient } from '../App';
import LinkButton from '../components/elements/Buttons';
import { RootState } from '../redux/modules';
import { userLogout } from '../redux/modules/auth';
import { CenterDivs } from '../components/elements/Divs';

const array = [1, 2];

export default function ProfilePage() {
  const dispatch = useDispatch();
  const platform = useSelector((state: RootState) => state.auth.platform);
  const handleLogout = async () => {
    try {
      if (platform === 'kakao') {
        await KakaoLogout();
      } else if (platform === 'google') {
        await GoogleLogout();
      }
      queryClient.clear();
      dispatch(userLogout());
    } catch (e) {}
  };

  return (
    <>
      <CenterDivs height="400px">
        {array.map((a, idx) => (
          <LinkButton
            title="로그아웃 하기"
            onPress={handleLogout}
            width="100px"
            height="100px"
            key={idx}
          />
        ))}
      </CenterDivs>
    </>
  );
}
