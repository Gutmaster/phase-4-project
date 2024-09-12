import React from "react";
import App from "./components/App";
import "./index.css";
import { createRoot } from "react-dom/client";
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
