import React from 'react';
import styled, { css } from 'styled-components/native';
import { likeText } from '../../assets/data/join';
import { Section } from '../../assets/styles/theme';
import { useFormContainer } from '../../hooks/useFormContainer';
import Fonts from '../elements/Fonts';
import { Form, FormSelectButton, FormCompleteButton } from '../elements/Forms';
import { FormElementProps } from '../elements/interface';

export default function SelectLike() {
  return (
    <Form formName="likeRecipesId">
      {({ formName }) => (
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
              {likeText.map(({ text, radius, color, styles, id }, idx) => (
                <LikeSelectButton
                  key={idx}
                  idx={idx}
                  id={id}
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

export const FormScrollContainer = ({
  formName,
  children,
}: FormElementProps) => {
  const addFormChildren = useFormContainer(children, formName);

  return (
    <FormSelectScrollContainer
      horizontal
      contentContainerStyle={{
        width: 660,
        minHeight: 600,
      }}
      showsHorizontalScrollIndicator={false}>
      {addFormChildren}
    </FormSelectScrollContainer>
  );
};

/**
 * @todo
 * 안드로이드 issue
 *
 * scrollView의 overflow visible 속성이 안먹혀서 자식 컴포넌트가 짤린다
 *  -> top을 일일히 다시 옮겨줬다..
 * ios와 다르게 contentContainerStyle의 width와 height를 지정해 줘야 한다
 *
 *
 */
const LikeSelectButton = styled(FormSelectButton)`
  position: absolute;
  ${({ styles: { ...rest } }) =>
    css`
      ${rest}
    `}
`;

const FormSelectScrollContainer = styled.ScrollView`
  margin-top: -16px;
  flex-wrap: wrap;
  height: auto;
`;
