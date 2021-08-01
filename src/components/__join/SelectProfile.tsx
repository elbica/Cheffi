import React from 'react';
import {Section} from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import {Form, NextSubmit, SelectPhoto} from '../elements/Forms';

export default function SelectNickname() {
  return (
    <Form formName="profile">
      {({control, handleSubmit, formName}) => (
        <>
          <Section flexNumber="1.4">
            <Section justify="flex-start" margins="4% 0%">
              <Fonts size="xlarge" color="tableBlack" padV="8%" center>
                프로필을 선택하세요!
              </Fonts>
              <SelectPhoto control={control} formName={formName} />
            </Section>
            <Section justify="flex-end" align="flex-end">
              <NextSubmit
                handleSubmit={handleSubmit}
                goal="join3"
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
