import React from 'react';
import {useRef} from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {TextInput} from 'react-native';
import styled from 'styled-components/native';
import {theme} from '../../assets/styles/theme';
import {CenterDivs} from './Divs';
import Fonts from './Fonts';
import {Search} from './Images';
import {InputStyleProps} from './interface';

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

const InputStyle = styled.TextInput<InputStyleProps>`
  color: ${({color}) => theme.color[color || 'black']};
  border-bottom-width: 1px;
  border-color: ${({color}) => theme.color[color || 'black']};
  padding: 10px;
  text-align: center;
  font-size: ${({fontSize}) => theme.text[fontSize || 'medium']};
  width: ${({width}) => width || '100%'};
`;

const PlaceholderIcon = styled.View<{width: string}>`
  flex-direction: row;
  position: absolute;
  width: ${({width}) => width || '100%'};
  justify-content: center;
  align-items: center;
  background: transparent;
  z-index: 0;
`;
