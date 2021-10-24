import React from 'react';
import { UserInfo } from '../components/__profile/UserInfo';
import { Setting } from '../components/__profile/Setting';
import { AppWrap } from '../assets/styles/theme';
import { useUserInfo } from '../hooks/useRedux';

export default function ProfilePage() {
  const info = useUserInfo();

  return (
    <AppWrap>
      <UserInfo info={info} />
      <Setting />
    </AppWrap>
  );
}
