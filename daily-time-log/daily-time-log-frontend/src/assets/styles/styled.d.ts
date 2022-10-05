import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      lightGray: string;
      darkgray: string;
      gray: string;
      lightblue: string;
      blue: string;
      darkblue: string;
      lightpink: string;
      pink: string;
      darkpink: string;
      black: string;
      white: string;
    };
    color: {
      backgroundColor: string;
      mainBackgroundColor: string;
      border: string;
      title: string;
      buttonFont: string;
      font: string;
      scheduleBackground: string;
    };
    size: {
      headerHeight: string;
      large: {
        height: string;
        fontSize: string;
      };
      medium: {
        height: string;
        fontSize: string;
      };
      small: {
        height: string;
        fontSize: string;
      };
    };
  }
}
