import "src/lib/tailwind.css";
import { MantineProvider } from "@mantine/core";
import type { CustomAppPage } from "next/app";

const MyApp: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}
      emotionOptions={{ key: "mantine", prepend: false }}
    >
      {getLayout(<Component {...pageProps} />)}
    </MantineProvider>
  );
};

export default MyApp;
