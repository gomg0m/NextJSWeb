//import '../styles/globals.css';
import { useState } from "react";
import AppContext from "../src/component/AppContext";


function MyApp({ Component, pageProps }) {
  const [planID, setPlanID] = useState(1);

  return (
    <AppContext.Provider
      value={{
        state: {
          statevar: planID,
        },
        statefunc: setPlanID,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
