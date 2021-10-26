import React, { useState } from 'react';
import { UserInfo } from '../components/__profile/UserInfo';
import { Setting } from '../components/__profile/Setting';
import { AppWrap } from '../assets/styles/theme';
import { useUserInfo } from '../hooks/useRedux';
import { useDispatch } from 'react-redux';
import { userInit } from '../redux/modules';
import { putUserInfo } from '../api';

export default function ProfilePage() {
  const info = useUserInfo();
  const [isChange, setIsChange] = useState(false);
  const [nickname, setNickname] = useState('익명');
  const [message, setMessage] = useState('안녕하세요!');
  const dispatch = useDispatch();
  const saveChange = () => {
    dispatch(userInit({ nickname, statusMessage: message }));
    putUserInfo(message, nickname);
  };

  return (
    <AppWrap>
      <UserInfo
        info={info}
        isChange={isChange}
        setNickname={setNickname}
        setMessage={setMessage}
      />
      <Setting
        isChange={isChange}
        setIsChange={setIsChange}
        callback={saveChange}
      />
    </AppWrap>
  );
}
