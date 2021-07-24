import {DefaultTheme} from 'styled-components';
import styled from 'styled-components/native';
import {SectionProps} from './StyleInterface';

//자주 쓰는 스타일들 정의
export const theme: DefaultTheme = {
  color: {
    main: 'green',
    sub: '#fff',
  },
  padding: {
    main: '5% 7%',
  },
};

export const AppWrap = styled.View`
  padding: ${theme.padding.main};
`;

export const Section = styled.View`
  flex: ${(props: SectionProps) => (props.flexNumber ? props.flexNumber : 2)};
  background-color: ${(props: SectionProps) =>
    props.background ? props.background : 'none'};
  flex-direction: ${(props: SectionProps) => (props.row ? 'row' : 'column')};
  flex-wrap: wrap;
`;
