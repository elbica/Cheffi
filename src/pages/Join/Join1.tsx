import React from 'react';
import {BackgroundSection} from '../../assets/styles/theme';
import {FryPan} from '../../components/elements/Images';
import SelectNickname from '../../components/__join/SelectNickname';

export default function Join1() {
  return (
    <BackgroundSection>
      <FryPan />
      <SelectNickname />
    </BackgroundSection>
  );
}
