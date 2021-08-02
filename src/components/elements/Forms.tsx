import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useMemo} from 'react';
import {useEffect} from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import {Alert} from 'react-native';
import styled from 'styled-components/native';
import {vh, vw} from '../../assets/styles/theme';
import {ActionButton, SelectButton} from './Buttons';
import {RowDivs} from './Divs';
import Fonts from './Fonts';
import {NextArrow} from './Images';
import {FormElementProps, FormProps, NextSubmitProps} from './interface';

export const Form = ({formName, children}: FormProps) => {
  const method = useForm({
    defaultValues: {
      [formName]: '',
    },
  });

  return <FormProvider {...method}>{children({formName})}</FormProvider>;
};

export const FormSetContainer = ({formName, children}: FormElementProps) => {
  const {setValue, register, getValues} = useFormContext();
  const handleChange = useCallback(
    (idx: number) => {
      setValue(
        formName + `.${idx}`,
        getValues(formName)[idx] ? '' : idx.toString(),
      );
      console.log(getValues(formName));
    },
    [formName, setValue, getValues],
  );

  useEffect(() => {
    register(formName + '.0');
  }, [formName, register]);

  const childrenWithProps = useMemo(
    () =>
      React.Children.map<React.ReactNode, React.ReactNode>(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            handleChange,
          });
        }
      }),
    [children, handleChange],
  );

  return <FormSelectSetContainer>{childrenWithProps}</FormSelectSetContainer>;
};

export const FormSelectButton = ({handleChange, idx, ...rest}: any) => {
  return <SelectButton onPress={() => handleChange(idx)} {...rest} />;
};

export const FormInputText = ({formName, placeholder}: FormElementProps) => {
  const {setValue, register} = useFormContext();

  useEffect(() => {
    register(formName);
  }, [formName, register]);
  return (
    <FormInputStyle
      onChangeText={value => setValue(formName, value)}
      placeholder={placeholder}
    />
  );
};

export const FormSelectPhoto = ({formName}: FormElementProps) => {
  const {setValue, register} = useFormContext();

  const onPress = () => {
    Alert.alert('사진 가져오기');
  };
  useEffect(() => {
    register(formName);
  }, [formName, register]);
  return (
    <SelectPhotoButton onPress={onPress} height="50px" width={`${82 * vw}px`}>
      <Fonts color="white" size="large">
        사진첩으로부터 가져오기
      </Fonts>
    </SelectPhotoButton>
  );
};
export function NextSubmit({goal, ...rest}: NextSubmitProps) {
  const {handleSubmit} = useFormContext();
  const navigation = useNavigation();
  const onSubmit: SubmitHandler<any> = (data: string) => {
    console.log(data);
    navigation.navigate(goal);
  };
  return (
    <ActionButton
      onPress={handleSubmit(onSubmit)}
      width="72px"
      {...rest}
      height={`${10 * vh}px`}>
      <RowDivs>
        <Fonts center color="tableBlack">
          다음
        </Fonts>
        <NextArrow />
      </RowDivs>
    </ActionButton>
  );
}
const FormInputStyle = styled.TextInput`
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

const FormSelectSetContainer = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  /* background-color: red; */
  width: ${86 * vw}px;
  margin: 10px auto;
  height: ${14 * vh}px;
`;
