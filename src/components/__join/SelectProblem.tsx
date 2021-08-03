import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Section} from '../../assets/styles/theme';
import {CheckBoxButton} from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import {
  Form,
  NextSubmit,
  FormSetContainer,
  FormSelectButton,
} from '../elements/Forms';

const CheckBoxes = () => {
  const navigation = useNavigation();
  return (
    <Section
      // background="red"
      flexNumber="0.32"
      align="flex-start"
      justify="space-evenly">
      <CheckBoxButton
        children=" 이 음식은 못 먹어요."
        size="medium"
        onPress={() => navigation.navigate('join4')}
      />
      <CheckBoxButton
        children=" 알러지가 있어요."
        size="medium"
        onPress={() => navigation.navigate('join4')}
      />
    </Section>
  );
};

export default function SelectProblem() {
  return (
    <Form formName="problems">
      {({formName}) => (
        <Section flexNumber="7" width="85%" margins="0 auto">
          <Section justify="flex-end">
            <Fonts
              size="large"
              color="tableBlack"
              padV="8%"
              center
              lineHeight="xlarge">
              {'아래에 해당사항이\n있으시다면 선택하여 주세요.'}
            </Fonts>
            <FormSetContainer formName={formName}>
              {problemText1.map(({text, width}, idx) => (
                <FormSelectButton
                  key={idx}
                  idx={idx}
                  children={text}
                  width={width}
                />
              ))}
            </FormSetContainer>
            <FormSetContainer formName={formName}>
              {problemText2.map(({text, width}, idx) => (
                <FormSelectButton
                  key={idx}
                  idx={idx + problemText1.length}
                  children={text}
                  width={width}
                />
              ))}
            </FormSetContainer>
          </Section>
          <CheckBoxes />
          <Section justify="flex-end" align="flex-end" flexNumber="0.3">
            <NextSubmit goal="join5" marginV="10%" />
          </Section>
        </Section>
      )}
    </Form>
  );
}

const problemText1 = [
  {text: '고기를\n먹지\n않아요', width: '28%'},
  {text: '당분을\n조금만\n섭취해야해요', width: '36%'},
  {text: '칼로리를\n조절해야\n해요', width: '30%'},
];
const problemText2 = [
  {text: '밀가루를 먹지\n않아요', width: '55%'},
  {text: '자극적인 것을\n싫어해요', width: '42%'},
];
