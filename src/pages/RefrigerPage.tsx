import React from 'react';
import {Alert, Text} from 'react-native';
import {Section, theme} from '../assets/styles/theme';
import {SelectButton} from '../components/elements/Buttons';

const onPress = () => {
  // Alert.alert('hello');
};
export default function RefrigerPage() {
  return (
    <Section>
      <Text>??sddsaf?</Text>
      <SelectButton
        onPress={onPress}
        color={theme.color.carrot}
        border={theme.color.deepOrange}>
        안녕~
      </SelectButton>
    </Section>
  );
}
