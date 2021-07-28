import React from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import LinkButton from '../components/Buttons';
import {userLogout} from '../redux/actions/actions';

export default function ProfilePage() {
  const logout = useDispatch();

  return (
    <View>
      <LinkButton
        title="로그아웃 하기"
        onPress={() => logout(userLogout())}
        width="100px"
        height="50px"
      />
    </View>
  );
}
