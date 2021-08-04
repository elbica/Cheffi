import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {BackgroundSection, Section} from '../../assets/styles/theme';
import Fonts from '../../components/elements/Fonts';
import {FryPan} from '../../components/elements/Images';
import {RootState} from '../../redux/modules';
import {userLogin} from '../../redux/modules/auth';

export default function Join6() {
  const dispatch = useDispatch();
  const formData = useSelector((state: RootState) => state.form);
  const [nickName, setNickname] = useState('');
  useEffect(() => {
    /**
     * @todo
     * 추후 axios를 이용해
     * formData를 백엔드로 보내야 한다.
     */
    console.log(formData);
    setNickname(formData.nickname || '');
    setTimeout(() => dispatch(userLogin('sohee')), 2000);
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
          {`${nickName}님을 위한\n 냉장고를 준비할게요!`}
        </Fonts>
      </Section>
    </BackgroundSection>
  );
}
