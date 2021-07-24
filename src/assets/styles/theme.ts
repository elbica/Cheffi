import {DefaultTheme} from 'styled-components';
import styled from 'styled-components/native';
import {FontProps, SectionProps} from './StyleInterface';

//자주 쓰는 스타일들 정의
export const theme: DefaultTheme = {
  color: {
    main: 'green',
    sub: '#fff',
  },
  padding: {
    main: '5% 7% 15% 7%',
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
`;

export const Section = styled.View`
  flex: ${(props: SectionProps) => props.flexNumber};
  background-color: ${(props: SectionProps) =>
    props.background ? props.background : 'transparent'};
  flex-direction: ${(props: SectionProps) => (props.row ? 'row' : 'column')};
  flex-wrap: wrap;
  padding: ${(props: SectionProps) => (props.paddings ? props.paddings : 0)};
  /* padding:${'10px 5px'} */
  margin: ${(props: SectionProps) => (props.margin ? props.margin : 0)};
  justify-content: ${(props: SectionProps) =>
    props.justify ? props.justify : 'center'};
  width: 100%;
  height: 100%;
`;

export const Font = styled.Text`
  font-size: ${(props: FontProps) => theme.text[props.size]};
`;
