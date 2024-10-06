import { useEffect } from "react";
import "./App.css";
import Pages from "./Pages";
import useUserStore from "./Stores/useUserStore";

function App() {
  const checkAuthToken = useUserStore((state) => state.checkAuthToken);

  useEffect(() => {
    checkAuthToken();
  }, [checkAuthToken]);

  return (
    <div className="App">
      <Pages />
    </div>
  );
}

export default App;
