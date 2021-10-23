import React from 'react';
import { Section } from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import { Form, FormInputText, NextSubmit } from '../elements/Forms';

export default function SelectNickname() {
  return (
    <Form formName="nickname">
      {({ formName }) => (
        <Section flexNumber="1.4">
          <Section justify="flex-start" margins="5% 0%">
            <Fonts size="xlarge" color="tableBlack" padV="7%" center>
              당신의 닉네임은?
            </Fonts>
            <FormInputText
              formName={formName}
              placeholder="닉네임을 입력해주세요."
            />
          </Section>
          <Section row justify="flex-end" flexNumber={0.5} paddings="0% 8%">
            <NextSubmit goal="join3" />
          </Section>
        </Section>
      )}
    </Form>
  );
}
