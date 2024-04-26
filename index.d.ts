declare module "mock-html-from-css" {
  interface mockHtmlFromCss {
    (cssString: string): void;
  }

  export { mockHtmlFromCss };

  export const mockHtmlFromCss: mockHtmlFromCss;
}
