import { CustomLayout } from "next";
import Head from "next/head";

export const Layout: CustomLayout = (props) => {
  return (
    <>
      <Head>
        <title>Template</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h2>Header</h2>
      </header>
      <main className="py-20 md:py-32">{props.children}</main>
      <footer>
        <h2>Footer</h2>
      </footer>
    </>
  );
};
