import React from 'react';
import {Colors} from 'styled-components';
import {Section} from '../../assets/styles/theme';
import Fonts from '../elements/Fonts';
import {
  Form,
  FormSetContainer,
  FormSelectButton,
  FormCompleteButton,
} from '../elements/Forms';

export default function SelectLike() {
  return (
    <Form formName="like">
      {({formName}) => (
        <>
          <Section flexNumber="7" width="85%" margins="0 auto">
            <Section justify="flex-start">
              <Fonts
                size="large"
                color="tableBlack"
                padV="4%"
                center
                lineHeight="xlarge">
                {'이중에 좋아하시는 음식이\n있다면 골라주세요.'}
              </Fonts>
              <FormSetContainer formName={formName}>
                {likeText.map(({text, radius, color}, idx) => (
                  <FormSelectButton
                    key={idx}
                    idx={idx}
                    circle
                    color={color}
                    radius={radius}
                    children={text}
                  />
                ))}
              </FormSetContainer>
            </Section>
          </Section>
          <FormCompleteButton goal="join6" />
        </>
      )}
    </Form>
  );
}

const likeText: likeTextElement[] = [
  {text: '에그 샌드위치', radius: 55, color: 'deepGreen'},
  {text: '비프 스테이크', radius: 55, color: 'deepGreen'},
  {text: '미역국', radius: 40, color: 'deepGreen'},
  {text: '김치찌개', radius: 50, color: 'deepGreen'},
  {text: '계란말이', radius: 50, color: 'deepGreen'},
  {text: '샌드위치', radius: 50, color: 'deepGreen'},
  {text: '닭가슴살 샐러드', radius: 60, color: 'deepGreen'},
  {text: '파스타', radius: 40, color: 'deepGreen'},
  {text: '짜장면', radius: 40, color: 'deepGreen'},
  {text: '두부조림', radius: 50, color: 'deepGreen'},
];

interface likeTextElement {
  text: string;
  radius: number;
  color: Colors;
}
