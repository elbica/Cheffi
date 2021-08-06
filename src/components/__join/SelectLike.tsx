import React from 'react';
import styled, {css} from 'styled-components/native';
import {likeText} from '../../assets/data/join';
import {Section} from '../../assets/styles/theme';
import {useFormContainer} from '../../hooks/useFormContainer';
import Fonts from '../elements/Fonts';
import {Form, FormSelectButton, FormCompleteButton} from '../elements/Forms';
import {FormElementProps} from '../elements/interface';

export default function SelectLike() {
  return (
    <Form formName="like">
      {({formName}) => (
        <>
          <Section justify="flex-start">
            <Fonts
              size="large"
              color="tableBlack"
              padV="10%"
              center
              lineHeight="xlarge">
              {'이중에 좋아하시는 음식이\n있다면 골라주세요.'}
            </Fonts>
            <FormScrollContainer formName={formName}>
              {likeText.map(({text, radius, color, styles}, idx) => (
                <LikeSelectButton
                  key={idx}
                  idx={idx}
                  circle
                  color={color}
                  radius={radius}
                  children={text}
                  styles={styles}
                />
              ))}
            </FormScrollContainer>
          </Section>
          <FormCompleteButton goal="join6" />
        </>
      )}
    </Form>
  );
}

export const FormScrollContainer = ({formName, children}: FormElementProps) => {
  const addFormChildren = useFormContainer(children, formName);

  return (
    <FormSelectScrollContainer
      horizontal
      contentContainerStyle={{flexWrap: 'wrap', width: 700}}
      showsHorizontalScrollIndicator={false}>
      {addFormChildren}
    </FormSelectScrollContainer>
  );
};

const LikeSelectButton = styled(FormSelectButton)`
  position: absolute;
  ${({styles: {...rest}}) =>
    css`
      ${rest}
    `}
`;

const FormSelectScrollContainer = styled.ScrollView`
  padding-top: 80px;
  flex-wrap: wrap;
`;
