import React, { useCallback, useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

/**
 *
 * @param children form context를 추가하고 싶은 children 노드
 * @param formName children 노드들의 입력 배열을 관리하는 form name
 * @returns form context가 추가된 children 노드
 */
export const useFormContainer = (
  children: React.ReactNode | React.ReactNodeArray,
  formName = 'default',
) => {
  const { setValue, register, getValues } = useFormContext();
  const handleChange = useCallback(
    (idx: number, text?: string) => {
      const value = text || idx.toString();

      setValue(formName + `.${idx}`, getValues(formName)[idx] ? null : value);
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

  return childrenWithProps;
};
