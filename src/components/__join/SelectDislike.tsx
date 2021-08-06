import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import styled from 'styled-components/native';
import {Section, vh} from '../../assets/styles/theme';
import {ChipButton} from '../elements/Buttons';
import {CenterDivs} from '../elements/Divs';
import Fonts from '../elements/Fonts';
import {Form, FormViewContainer, NextSubmit} from '../elements/Forms';
import IngredientInput from '../elements/Inputs';
import {InputEvent} from '../elements/interface';

/**
 *
 * @todo
 * chip 버튼이 삭제될 때,
 * 모든 버튼이 다시 unmount 후 mount 되면서
 * form 정보를 제어하는 handleChange 함수가
 * 버튼 개수 * 2 - 1 만큼 호출된다. 어떻게 해결할까?
 */

const DislikeChip = ({handleChange, idx, text, setArray}: DislikeChipProps) => {
  useEffect(() => {
    handleChange(idx, text);
    return () => handleChange(idx);
  }, [handleChange, idx, text]);

  const onPress = useCallback(() => {
    setArray(array => array.filter(element => element !== text));
  }, [setArray, text]);

  return <ChipButton children={text} onPress={onPress} />;
};

export default function SelectDislike() {
  const [dislikeArray, setDislikeArray] = useState<string[]>([]);
  const {
    params: {formName},
  } = useRoute<RouteProp<{join4: {formName: string}}, 'join4'>>();

  const checkValidation = (text: string) => {
    if (dislikeArray.includes(text)) return false;
    if (text === '') return false;
    return true;
  };

  const onEndEditing = (ev: InputEvent) => {
    ev.persist();
    const value = ev.nativeEvent.text;
    if (checkValidation(value)) setDislikeArray([...dislikeArray, value]);
  };

  return (
    <Form formName={formName}>
      {({formName}) => (
        <Section flexNumber="1.4">
          <Section justify="flex-start" margins="8% 0%" paddings="0% 8%">
            <Fonts size="large" color="tableBlack" center>
              못먹는 음식/재료가 있나요?
            </Fonts>
            <CenterDivs height={`${10 * vh}px`}>
              <IngredientInput icon onEndEditing={onEndEditing} />
            </CenterDivs>
            <CenterDivs height={`${15 * vh}px`}>
              <DislikeInputSet formName={formName}>
                {dislikeArray.map((dislike, idx) => (
                  /**
                   * @todo
                   * props가 중간에 React.cloneElement로 전달될 때는
                   * 타입을 어떻게 정의해야 할까?
                   * */
                  <DislikeChip
                    text={dislike}
                    key={idx}
                    idx={idx}
                    setArray={setDislikeArray}
                  />
                ))}
              </DislikeInputSet>
            </CenterDivs>
          </Section>
          <Section justify="flex-end" align="flex-end">
            <NextSubmit goal="join3" check marginH="7%" marginV="10%" />
          </Section>
        </Section>
      )}
    </Form>
  );
}

const DislikeInputSet = styled(FormViewContainer)`
  justify-content: flex-start;
  align-items: flex-start;
`;

interface DislikeChipProps {
  handleChange(idx: number, text?: string): void;
  idx: number;
  text: string;
  setArray: React.Dispatch<React.SetStateAction<string[]>>;
}
