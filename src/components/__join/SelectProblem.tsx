import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Section } from '../../assets/styles/theme';
import { CheckBoxButton } from '../elements/Buttons';
import Fonts from '../elements/Fonts';
import {
  Form,
  NextSubmit,
  FormViewContainer,
  FormSelectButton,
} from '../elements/Forms';

const CheckBoxes = () => {
  const navigation = useNavigation();
  return (
    <Section flexNumber="0.35" align="flex-start" justify="flex-start">
      <CheckBoxButton
        children="못 먹거나 싫어하는 재료가 있어요."
        size="medium"
        onPress={() =>
          navigation.navigate('join4', { formName: 'dislikeIngredient' })
        }
      />
      {/* <CheckBoxButton
        marginV="20px"
        children=" 알러지가 있어요."
        size="medium"
        onPress={() => navigation.navigate('join4', { formName: 'allergy' })}
      /> */}
    </Section>
  );
};

export default function SelectProblem() {
  return (
    <Form formName="problems">
      {({ formName }) => (
        <Section flexNumber="7" width="85%" margins="0 auto">
          <Section justify="flex-start">
            <Fonts
              size="large"
              color="tableBlack"
              padV="4%"
              center
              lineHeight="xlarge">
              {'아래에 해당사항이\n있으시다면 선택하여 주세요.'}
            </Fonts>
            <FormViewContainer formName={formName}>
              {problemText.map(({ text, width }, idx) => (
                <FormSelectButton
                  key={idx}
                  idx={idx}
                  id={text}
                  children={text}
                  width={width}
                />
              ))}
            </FormViewContainer>
          </Section>
          <CheckBoxes />
          <Section row justify="flex-end" flexNumber="0.35">
            <NextSubmit goal="join4-1" />
          </Section>
        </Section>
      )}
    </Form>
  );
}

const problemText = [
  { text: '고기를\n먹지\n않아요', width: '28%' },
  { text: '당분을\n조금만\n섭취해야해요', width: '36%' },
  { text: '칼로리를\n조절해야\n해요', width: '30%' },
  { text: '밀가루를 먹지\n않아요', width: '55%' },
  { text: '자극적인 것을\n싫어해요', width: '42%' },
];
