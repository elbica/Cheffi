import 'styled-components';

//DefaultTheme 타입 정의
declare module 'styled-components' {
  export interface DefaultTheme {
    basicWidth: string;

    color: {
      main: string;
      sub: string;
    };
  }
}
