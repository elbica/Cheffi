import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useEffect } from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { vh, vw } from '../../assets/styles/theme';
import { useFormContainer } from '../../hooks/useFormContainer';
import { formSet } from '../../redux/modules/form';
import {
  ActionButton,
  ImageButton,
  SelectButton,
  SelectCircleButton,
} from './Buttons';
import { CenterDivs, RowDivs } from './Divs';
import Fonts from './Fonts';
import { Check, NextArrow } from './Images';
import { FormElementProps, FormProps, NextSubmitProps } from './interface';

export const Form = ({ formName, children }: FormProps) => {
  const method = useForm({
    defaultValues: {
      [formName]: '',
    },
  });

  return <FormProvider {...method}>{children({ formName })}</FormProvider>;
};

export const FormViewContainer = ({
  formName,
  children,
  style,
}: FormElementProps) => {
  const addFormChildren = useFormContainer(children, formName);

  return (
    <FormSelectSetContainer style={style}>
      {addFormChildren}
    </FormSelectSetContainer>
  );
};

export const FormSelectButton = ({
  handleChange,
  idx,
  circle,
  radius,
  children,
  ...rest
}: any) => {
  return (
    <>
      {circle ? (
        <SelectCircleButton
          radius={radius}
          onPress={children ? () => handleChange(idx, children) : undefined}
          marginV="8px"
          children={children}
          {...rest}
        />
      ) : (
        <SelectButton
          onPress={children ? () => handleChange(idx, children) : undefined}
          marginV="8px"
          children={children}
          {...rest}
        />
      )}
    </>
  );
};

export const FormInputText = ({ formName, placeholder }: FormElementProps) => {
  const { setValue, register } = useFormContext();

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

export const FormSelectPhoto = ({ formName }: FormElementProps) => {
  const { setValue, register } = useFormContext();

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
export function NextSubmit({ goal, check, ...rest }: NextSubmitProps) {
  const { handleSubmit } = useFormContext();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<any> = (data: object) => {
    dispatch(formSet(data));
    navigation.navigate(goal);
  };
  return (
    <ActionButton
      onPress={handleSubmit(onSubmit)}
      width="72px"
      {...rest}
      height={`${10 * vh}px`}>
      <RowDivs>
        {check ? (
          <>
            <CenterDivs width="38px" height="36px">
              <Check color="tableBlack" />
            </CenterDivs>
            <Fonts center color="tableBlack">
              완료
            </Fonts>
          </>
        ) : (
          <>
            <Fonts center color="tableBlack">
              다음
            </Fonts>
            <NextArrow />
          </>
        )}
      </RowDivs>
    </ActionButton>
  );
}

export function FormCompleteButton({ goal, ...rest }: NextSubmitProps) {
  const { handleSubmit } = useFormContext();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<any> = (data: object) => {
    dispatch(formSet(data));
    navigation.navigate(goal);
  };
  return (
    // <Section background="black">
    <ImageButton
      onPress={handleSubmit(onSubmit)}
      height="75px"
      color="black"
      radius={0}
      // marginV="10px"
      {...rest}>
      <Fonts color="white" size="large" bold>
        선택 완료
      </Fonts>
    </ImageButton>
    // </Section>
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
  width: 100%;
  margin: 10px auto;
  height: ${14 * vh}px;
  /* background: red; */
`;
