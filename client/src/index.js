import React from "react";
import App from "./components/App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom"

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);

ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );
