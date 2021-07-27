import React from 'react';
import {Text} from 'react-native';
import {Section} from '../../assets/styles/theme';
import LinkButton from '../../components/Buttons';

export default function Join1({navigation}) {
  return (
    <Section flexNumber={1}>
      <Text>join 11111</Text>
      <LinkButton
        title="next"
        onPress={() => navigation.navigate('join2')}
        width="100px"
        height="50px"
      />
    </Section>
  );
}
