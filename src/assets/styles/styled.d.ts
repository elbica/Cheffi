import 'styled-components';

//DefaultTheme 타입 정의
declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      main: string;
      sub: string;
    };
    padding: {
      main: string;
    };
  }
}
