import React from 'react';
import {Section} from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import {Form, FormInputText, NextSubmit} from '../elements/Forms';

export default function SelectNickname() {
  return (
    <Form formName="nickname">
      {({control, handleSubmit, formName}) => (
        <>
          <Section flexNumber="1.4">
            <Section justify="flex-start" margins="4% 0%">
              <Fonts size="xlarge" color="tableBlack" padV="8%" center>
                당신의 닉네임은?
              </Fonts>
              <FormInputText
                control={control}
                formName={formName}
                placeholder="닉네임을 입력해주세요."
              />
            </Section>
            <Section justify="flex-end" align="flex-end">
              <NextSubmit
                handleSubmit={handleSubmit}
                goal="join2"
                marginH="5%"
                marginV="10%"
              />
            </Section>
          </Section>
        </>
      )}
    </Form>
  );
}
