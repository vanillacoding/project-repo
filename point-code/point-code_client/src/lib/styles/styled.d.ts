import 'styled-components';

export interface IColor {
  gray: string[],
  grape: string[]
  red: string[],
  teal: string[],
  green: string[],
  blue: string[]
  lightGray: string;
}

declare module 'styled-components' {
  interface DefaultTheme {
    color: IColor;
  }
}
