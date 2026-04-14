import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VideosProvider } from "./store/VideosContext.jsx";
import { Provider } from "react-redux";
import store from "./store/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <VideosProvider> */}
        <App />
      {/* </VideosProvider> */}
    </Provider>
  </StrictMode>,
);
