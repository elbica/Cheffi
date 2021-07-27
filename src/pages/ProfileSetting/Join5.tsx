import React from 'react';
import {Text} from 'react-native';
import {Section} from '../../assets/styles/theme';
import LinkButton from '../../components/Buttons';

export default function Join5({navigation}) {
  return (
    <Section flexNumber={1}>
      <Text>join 5555</Text>
      <LinkButton
        title="next"
        onPress={() => navigation.navigate('join6')}
        width="100px"
        height="50px"
      />
    </Section>
  );
}
