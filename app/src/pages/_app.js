import "../styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { wrapper } from "../app/store";

function MyApp({ Component, pageProps }) {
  const store = useStore((store) => store);
  return (
    <PersistGate loading={null} persistor={store.__persistor}>
      <Component {...pageProps} />
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
