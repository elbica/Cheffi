import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {Section} from '../assets/styles/theme';
import LinkButton from '../components/Buttons';
import {userLogout} from '../redux/actions/actions';

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
export default function ProfilePage() {
  const logout = useDispatch();

  return (
    <View>
      <ScrollView>
        <Section flexNumber={2} background="yellow">
          {array.map((a, idx) => (
            <LinkButton
              title="로그아웃 하기"
              onPress={() => logout(userLogout())}
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
              onPress={() => logout(userLogout())}
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
