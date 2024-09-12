import React, { useEffect, useState } from "react";
import Home from "./Home.js"
import Navbar from "./NavBar.js";
import Photographs from "./Photographs.js"
import Animals from "./Animals.js"
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/photographs">
          <Photographs />
        </Route>
        <Route exact path="/animals">
          <Animals />
        </Route>
        <Route exact path="/animals/:id">
          {/* <Species /> */}
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
