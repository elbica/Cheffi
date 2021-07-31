import React from 'react';
import {Text} from 'react-native';
import {BackgroundSection} from '../../assets/styles/theme';
import LinkButton from '../../components/elements/Buttons';

export default function Join3({navigation}) {
  return (
    <BackgroundSection>
      <Text>join 333</Text>
      <LinkButton
        title="next"
        onPress={() => navigation.navigate('join4')}
        width="100px"
        height="50px"
      />
    </BackgroundSection>
  );
}
