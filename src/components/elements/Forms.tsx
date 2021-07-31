import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useForm, Controller} from 'react-hook-form';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {vw} from '../../assets/styles/theme';
import {ActionButton} from './Buttons';
import {RowDivs} from './Divs';
import Fonts from '../Fonts';
import {NextArrow} from './Images';

interface FormProps {
  formName: string;
  children(param: any): React.ReactElement;
}
interface NextSubmitProps {
  handleSubmit: any;
  goal: string;
  marginV?: string;
  marginH?: string;
  padV?: string;
  padH?: string;
}

interface PhotoProps {
  control: any;
  formName: string;
}

interface InputProps extends PhotoProps {
  placeholder: string;
}

export function NextSubmit({handleSubmit, goal, ...rest}: NextSubmitProps) {
  const navigation = useNavigation();
  const onSubmit = (data: string) => {
    navigation.navigate(goal);
  };
  return (
    <ActionButton
      onPress={handleSubmit(onSubmit)}
      {...rest}
      padV="3%"
      padH="5%">
      <RowDivs>
        <Fonts center padH="2%" color="tableBlack">
          다음
        </Fonts>
        <NextArrow />
      </RowDivs>
    </ActionButton>
  );
}

export const Form = ({formName, children}: FormProps) => {
  const {handleSubmit, control} = useForm({
    defaultValues: {
      [formName]: '',
    },
  });

  return children({handleSubmit, control, formName});
};
export const Input = ({control, formName, placeholder}: InputProps) => {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <FormInput
          onBlur={onBlur}
          onChangeText={value => onChange(value)}
          value={value}
          placeholder={placeholder}
        />
      )}
      name={formName}
      rules={{required: true}}
    />
  );
};

export const SelectPhoto = ({control, formName}: PhotoProps) => {
  const onPress = () => {
    Alert.alert('사진 가져오기');
  };
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <SelectPhotoButton onPress={onPress} padV="14px" padH={`${17 * vw}px`}>
          <Fonts color="white" size="large">
            사진첩으로부터 가져오기
          </Fonts>
        </SelectPhotoButton>
      )}
      name={formName}
      rules={{required: true}}
    />
  );
};

const FormInput = styled.TextInput`
  color: ${props => props.theme.color.tableGray};
  border-bottom-width: 1px;
  border-color: ${props => props.theme.color.tableGray};
  padding: 10px;
  text-align: center;
  font-size: ${props => props.theme.text.large};
  width: ${82 * vw}px;
`;

const SelectPhotoButton = styled(ActionButton)`
  background-color: ${props => props.theme.color.carrot};
  border-radius: 8px;
`;