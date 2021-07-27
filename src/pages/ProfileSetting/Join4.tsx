import React from 'react';
import {Text} from 'react-native';
import {Section} from '../../assets/styles/theme';
import LinkButton from '../../components/Buttons';

export default function Join4({navigation}) {
  return (
    <Section flexNumber={1}>
      <Text>join 4</Text>
      <LinkButton
        title="next"
        onPress={() => navigation.navigate('join5')}
        width="100px"
        height="50px"
      />
    </Section>
  );
}
