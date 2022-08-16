import { createGetInitialProps } from "@mantine/next";
import Document, { Html, Head, Main, NextScript } from "next/document";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang="ja">
        <Head />
        <body className="my-0 mx-auto h-screen w-full max-w-screen-xl px-5 lg:px-20">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
