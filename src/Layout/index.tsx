import { CustomLayout } from "next";
import Head from "next/head";
import { Footer } from "src/Layout/Footer";
import { Header } from "src/Layout/Header";

export const Layout: CustomLayout = (props) => {
  return (
    <>
      <Head>
        <title>こうしき。</title>
      </Head>
      <Header />
      <main className="mx-auto max-w-screen-lg py-10 px-5 md:py-20 md:px-10">
        {props.children}
      </main>
      <Footer />
    </>
  );
};
