import React, { useEffect, useState } from "react";

import Welcome from "./pages/Welcome";
import Single from "./pages/Single";
import Multi from "./pages/Multi";
import { SINGLE, MULTI } from "./constants/mode";
import Loading from "./components/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState("");
  const handleHomeButtonClick = () => setMode("");

  useEffect(() => {
    async function registerServiceWorker() {
      if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
        await navigator.serviceWorker.register("/sw.js");
      }

      setIsLoading(false);
    }

    registerServiceWorker();
  }, []);

  return (
    <div className="App">
      {isLoading ? <Loading /> : <div>
        {!mode && <Welcome onSelectMode={setMode} />}
        {mode === SINGLE
          && <Single onHomeButtonClick={handleHomeButtonClick} />}
        {mode === MULTI
          && <Multi onHomeButtonClick={handleHomeButtonClick} />}
      </div>}
    </div>
  );
}

export default App;
