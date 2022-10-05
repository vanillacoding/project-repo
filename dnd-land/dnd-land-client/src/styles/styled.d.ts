import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    size: {
      maxWidth: string;
      maxHeight: string;
    };
    colors: {
      [key: string]: string;
    };
  }
}
