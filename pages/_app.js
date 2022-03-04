//import '../styles/globals.css';
import { useState } from "react";
import AppContext from "../src/component/AppContext";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [planID, setPlanID] = useState(1);
  const [scheduleID, setScheduleID] = useState(10);

  return (
    <AppContext.Provider
      value={{
        state: {
          planID: planID,
          scheduleID: scheduleID,
        },
        setPlanID: setPlanID,
        setScheduleID: setScheduleID,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
