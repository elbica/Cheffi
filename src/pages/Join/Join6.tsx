import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendForm } from '../../api';
import { BackgroundSection, Section } from '../../assets/styles/theme';
import Fonts from '../../components/elements/Fonts';
import { FryPan } from '../../components/elements/Images';
import { formInit, RootState, userLogin } from '../../redux/modules';

export default function Join6() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const route = useRoute<Join6RouteProp>();

  const nickname = route.params.param || '익명';
  useEffect(() => {
    const sendFormData = async () => {
      /**
       * @todo
       * 추후 axios를 이용해 formData를 백엔드로 보내야 한다
       * formData를 user redux에 저장해야 한다
       */
      await sendForm(formData);

      dispatch(formInit());
      setTimeout(() => dispatch(userLogin({ isLogin: true })), 2000);
    };
    sendFormData();
  }, []);

  return (
    <BackgroundSection>
      <FryPan />
      <Section flexNumber="1.4" justify="flex-start">
        <Fonts
          center
          size="large"
          lineHeight="xlarge"
          padV="15%"
          color="tableBlack">
          {`${nickname}님을 위한\n 냉장고를 준비할게요!`}
        </Fonts>
      </Section>
    </BackgroundSection>
  );
}
