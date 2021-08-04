import React from 'react';
import {Section} from '../assets/styles/theme';
import {CheckBoxButton, CircleButton} from '../components/elements/Buttons';
import Fonts from '../components/elements/Fonts';

export default function RefrigerPage() {
  return (
    <Section>
      <CheckBoxButton width="30%">dkssud</CheckBoxButton>
      <CircleButton onPress={() => {}} radius={50}>
        <Fonts>안녕하세요</Fonts>
      </CircleButton>
    </Section>
  );
}
