import "src/lib/tailwind.css";
import { MantineProvider } from "@mantine/core";
import type { CustomAppPage } from "next/app";
import { Provider } from "react-redux";
import { store } from "src/state";

const MyApp: CustomAppPage = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
        emotionOptions={{ key: "mantine", prepend: false }}
      >
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </Provider>
  );
};

export default MyApp;
