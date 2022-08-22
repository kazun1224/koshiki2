import { ActionIcon, MediaQuery } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CustomLayout } from "next";
import Head from "next/head";
import { Footer } from "src/Layout/Footer";
import { Header } from "src/Layout/Header";
import { Menu2 } from "tabler-icons-react";

export const Layout: CustomLayout = (props) => {
  const [opened, handlers] = useDisclosure(false);

  return (
    <>
      <Head>
        <title>こうしき。</title>
      </Head>
      {/* <Header /> */}
      <Header
        left={
          <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <ActionIcon
              variant="hover"
              radius="xl"
              size={40}
              onClick={handlers.open}
            >
              <Menu2 />
            </ActionIcon>
          </MediaQuery>
        }
      />
      <main className="mx-auto max-w-screen-lg py-10 px-5 md:py-20 md:px-10">
        {props.children}
      </main>
      <Footer />
    </>
  );
};
