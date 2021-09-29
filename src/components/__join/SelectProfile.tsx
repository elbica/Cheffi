import React from 'react';
import { Section } from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import { Form, NextSubmit, FormSelectPhoto } from '../elements/Forms';

export default function SelectProfile() {
  return (
    <Form formName="photo">
      {({ formName }) => (
        <Section flexNumber="1.4">
          <Section justify="flex-start" margins="4% 0%">
            <Fonts size="xlarge" color="tableBlack" padV="8%" center>
              프로필을 선택하세요!
            </Fonts>
            <FormSelectPhoto formName={formName} />
          </Section>
          <Section row justify="flex-end" flexNumber={0.5} paddings="0% 8%">
            <NextSubmit goal="join3" />
          </Section>
        </Section>
      )}
    </Form>
  );
}
