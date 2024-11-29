import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Pages from "./Pages";
import useUserStore from "./Stores/useUserStore";
function App() {
  const checkAuthToken = useUserStore((state) => state.checkAuthToken);
  const navigate = useNavigate();
  useEffect(() => {
    checkAuthToken(navigate);
  }, [checkAuthToken, navigate]);

  return (
    <div className="App">
      <Pages /> <ToastContainer />
    </div>
  );
}

export default App;
