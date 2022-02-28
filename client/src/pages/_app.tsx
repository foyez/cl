// Libraries
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

// Files
import "styles/globals.scss";
import { Layout } from "components/layout";
import { store } from "store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
