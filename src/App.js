import React from "react";
import "./App.css";
import { HashRouter, Route } from "react-router-dom";
import ElectionForm from "./components/ElectionForm";
import ShowScore from "./components/ShowScore";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <header className="App-header">
          <ShowScore />
        </header>
        <Route exact path="/" component={ElectionForm} />
      </HashRouter>
    </div>
  );
}

export default App;
