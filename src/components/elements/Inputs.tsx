import React from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useState } from 'react';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import { theme, vh, vw } from '../../assets/styles/theme';
import { CenterDivs } from './Divs';
import Fonts from './Fonts';
import { Delete, Search } from './Images';
import {
  InputStyleProps,
  SearchInputProps,
  SearchResultProps,
} from './interface';

export default function IngredientInput({
  color = 'tableGray',
  width = '100%',
  fontSize = 'medium',
  icon,
  onEndEditing = () => {},
  placeholder = '재료를 입력해 주세요',
}: InputStyleProps) {
  const InputRef = useRef<TextInput>(null);
  const [placeholderDisplay, setDisplay] = useState(icon);
  const iconWidth = theme.text[fontSize];
  const handleChange = useCallback(
    (text: string) => {
      if (text === '') setDisplay(true);
      else if (text.length === 1) setDisplay(false);
    },
    [setDisplay],
  );
  const handleEditing = useCallback(() => {
    InputRef?.current?.clear();
    setDisplay(true);
  }, []);
  return (
    <CenterDivs>
      <InputStyle
        ref={InputRef}
        color={color}
        width={width}
        fontSize={fontSize}
        onChangeText={handleChange}
        onFocus={() => setDisplay(false)}
        onEndEditing={onEndEditing}
        onSubmitEditing={handleEditing}
      />
      {placeholderDisplay && (
        <PlaceholderIcon width={width} pointerEvents="none">
          {icon && (
            <Search color={color} width={iconWidth} height={iconWidth} />
          )}
          <Fonts color={color} padH="7px" size={fontSize}>
            {placeholder}
          </Fonts>
        </PlaceholderIcon>
      )}
    </CenterDivs>
  );
}

/**
 *
 * @param onEndEditing 상위 컴포넌트에서 입력 값 관리를 해야한다.
 * @description
 * onEndEditing 함수에 연관 검색어를 계산하는 로직이 들어가고,
 * debouncing & useCallback 을 적용해야 한다.
 *
 */
export const SearchInput = ({
  color = 'tableBlack',
  width = '100%',
  fontSize = 'mediumLarge',
  onChangeText = () => {},
  placeholder = '재료 이름으로 검색',
}: SearchInputProps) => {
  const iconWidth = `${2.2 * vh}px`;
  const InputRef = useRef<TextInput>(null);
  const [placeholderDisplay, setDisplay] = useState(true);
  const handleChange = useCallback(
    (text: string) => {
      if (text === '') setDisplay(true);
      else if (text.length === 1) setDisplay(false);
      onChangeText(text);
    },
    [setDisplay],
  );
  const handleDelete = useCallback(() => {
    InputRef?.current?.clear();
    setDisplay(true);
  }, []);
  return (
    <SearchInputWrap width={width}>
      <SearchInputElement
        ref={InputRef}
        onFocus={() => setDisplay(false)}
        onChangeText={handleChange}
      />
      {placeholderDisplay ? (
        <PlaceholderWrap pointerEvents="none">
          <SearchIcon color="carrot" width={iconWidth} height={iconWidth} />
          <Fonts color={color} padH="6%" size={fontSize}>
            {placeholder}
          </Fonts>
        </PlaceholderWrap>
      ) : (
        <DeleteWrap onPress={handleDelete}>
          <Delete color="carrot" />
        </DeleteWrap>
      )}
    </SearchInputWrap>
  );
};

export const SearchResult = ({ results }: SearchResultProps) => {
  return (
    <SearchResultWrap>
      {results?.map(result => (
        <Fonts key={result} children={result} padH="8%" />
      ))}
    </SearchResultWrap>
  );
};

const InputStyle = styled.TextInput<InputStyleProps>`
  color: ${({ color }) => theme.color[color || 'black']};
  border-bottom-width: 1px;
  border-color: ${({ color }) => theme.color[color || 'black']};
  padding: 10px;
  text-align: center;
  font-size: ${({ fontSize }) => theme.text[fontSize || 'medium']};
  width: ${({ width }) => width || '100%'};
`;

const PlaceholderIcon = styled.View<{ width: string }>`
  flex-direction: row;
  position: absolute;
  width: ${({ width }) => width || '100%'};
  justify-content: center;
  align-items: center;
  background: transparent;
  z-index: 0;
`;
const SearchInputWrap = styled.View<{ width: string }>`
  position: relative;
  width: ${({ width }) => width || '100%'};
  margin-top: ${2 * vh}px;
  margin-bottom: ${2.5 * vh}px;
  height: auto;
  /* background-color: red; */
`;
const SearchResultWrap = styled.View`
  /* background-color: red; */
  flex-wrap: wrap;
  width: 100%;
  height: auto;
  flex-direction: row;
`;
const SearchInputElement = styled.TextInput<SearchInputProps>`
  border-radius: 10px;
  /* border-color: ${({ color }) => theme.color[color || 'black'] + '88'};
  border-width: 1px; */
  width: ${({ width }) => width || '100%'};
  padding-top: ${1.7 * vh}px;
  padding-bottom: ${1.7 * vh}px;
  padding-left: ${5 * vw}px;
  font-size: ${({ fontSize }) => theme.text[fontSize || 'medium']};
  background-color: ${theme.color.carrot + '22'};
`;
const PlaceholderWrap = styled.View`
  position: absolute;
  flex-direction: row;
  /* background-color: green; */
  width: 88%;
  height: 100%;
  /* justify-content: space-between; */
  align-items: center;
  align-self: center;
`;
const DeleteWrap = styled.TouchableOpacity`
  position: absolute;
  height: 100%;
  justify-content: center;
  align-self: flex-end;
  margin-right: 6%;
`;
const SearchIcon = styled(Search)`
  /* position: absolute; */

  /* display: inline-block; */
  bottom: 20px;
  left: 20px;
`;
