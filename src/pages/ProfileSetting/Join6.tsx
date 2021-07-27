import React from 'react';
import {Text} from 'react-native';
import {Section} from '../../assets/styles/theme';
import LinkButton from '../../components/Buttons';

export default function Join6({setLogin}) {
  return (
    <Section flexNumber={1}>
      <Text>join 6666</Text>
      <LinkButton
        title="next"
        onPress={() => setLogin(true)}
        width="100px"
        height="50px"
      />
    </Section>
  );
}
