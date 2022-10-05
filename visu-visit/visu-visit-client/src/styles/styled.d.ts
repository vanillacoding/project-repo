import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      [key: string]: string;
    };

    gradient: {
      [key: string]: string;
    };

    boxShadow: string;
  }
}
