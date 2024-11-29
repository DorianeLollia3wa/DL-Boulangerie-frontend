import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <Pages /> <ToastContainer />
    </div>
  );
}

export default App;
