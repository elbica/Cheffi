import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogout, KakaoLogout } from '../api';
import { queryClient } from '../App';
import { Section } from '../assets/styles/theme';
import LinkButton from '../components/elements/Buttons';
import { RootState } from '../redux/modules';
import { userLogout } from '../redux/modules/auth';

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
    <View>
      <ScrollView>
        <Section flexNumber={2} background="yellow">
          {array.map((a, idx) => (
            <LinkButton
              title="로그아웃 하기"
              onPress={handleLogout}
              width="100px"
              height="100px"
              key={idx}
            />
          ))}
        </Section>
        <Section flexNumber={1} background="black">
          {array.map((a, idx) => (
            <LinkButton
              title="로그아웃 하기"
              onPress={handleLogout}
              width="100px"
              height="100px"
              key={idx}
            />
          ))}
        </Section>
      </ScrollView>
    </View>
  );
}
