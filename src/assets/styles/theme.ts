import {
  ButtonsProps,
  DefaultTheme,
  FontProps,
  SectionProps,
} from 'styled-components';
import styled from 'styled-components/native';

//자주 쓰는 스타일들 정의
export const theme: DefaultTheme = {
  color: {
    main: 'green',
    sub: '#fff',
  },
  padding: {
    main: '5% 7% 0% 7%',
  },
  text: {
    xlarge: '28px',
    large: '22px',
    medium: '18px',
    small: '14px',
  },
};

export const AppWrap = styled.View`
  padding: ${theme.padding.main};
  width: 100%;
  height: 100%;
`;

export const Section = styled.View`
  flex: ${(props: SectionProps) => props.flexNumber};
  background-color: ${(props: SectionProps) => props.background};
  flex-direction: ${(props: SectionProps) => (props.row ? 'row' : 'column')};
  flex-wrap: wrap;
  padding: ${(props: SectionProps) => props.paddings};
  /* padding:${'10px 5px'} */
  margin: ${(props: SectionProps) => props.margins};
  justify-content: ${(props: SectionProps) => props.justify};
  width: 100%;
  height: 100%;
`;

export const Font = styled.Text`
  font-size: ${(props: FontProps) => theme.text[props.size]};
`;

export const TouchButton = styled.TouchableHighlight`
  width: ${(props: ButtonsProps) => props.width};
  height: ${(props: ButtonsProps) => props.height};
  background-color: red;
  justify-content: center;
  align-items: center;
  margin: ${(props: ButtonsProps) => (props.margin ? props.margin : 0)};
`;

/* Default props */
Section.defaultProps = {
  background: 'transparent',
  row: false,
  paddings: '0',
  margins: '0',
  justify: 'center',
};
