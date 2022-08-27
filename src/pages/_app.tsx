import "src/lib/tailwind.css";
import { MantineProvider } from "@mantine/core";
import type { CustomAppPage } from "next/app";
import { Provider } from "react-redux";
import { store } from "src/state";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

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
        <ModalsProvider labels={{ confirm: "Submit", cancel: "Cancel" }}>
          <NotificationsProvider>
            {getLayout(<Component {...pageProps} />)}
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </Provider>
  );
};

export default MyApp;
