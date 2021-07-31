import React from 'react';
import {Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {BackgroundSection} from '../../assets/styles/theme';
import LinkButton from '../../components/elements/Buttons';
import {userLogin} from '../../redux/actions/actions';

export default function Join6() {
  const dispatch = useDispatch();
  const handleComplete = () => {
    dispatch(userLogin('sohee'));
  };
  return (
    <BackgroundSection>
      <Text>join 6666</Text>
      <LinkButton
        title="완료"
        onPress={handleComplete}
        width="100px"
        height="50px"
      />
    </BackgroundSection>
  );
}
