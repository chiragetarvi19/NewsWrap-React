import "./App.css";

import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";

import LoadingBar from "react-top-loading-bar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";

const App = () => {
  const arr = [
    "",
    "business",
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
  ];
  const pageSize = 20;
  const apiKey = process.env.REACT_APP_NEWS_API;
  const [progress, setProgress] = useState(10);
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "black";
    }
  };
  return (
    <div>
      <Router>
        <Navbar toggleMode={toggleMode} />
        <LoadingBar height={3} color="#f11946" progress={progress} />
        <Switch>
          {arr.map((element) => {
            if (element === "")
              return (
                <Route key="general" exact path="/">
                  <News
                    apiKey={apiKey}
                    setProgress={setProgress}
                    pageSize={pageSize}
                    country="in"
                    category="general"
                    mode={mode}
                  />
                </Route>
              );
            else
              return (
                <Route key={element} exact path={`/${element}`}>
                  <News
                    apiKey={apiKey}
                    setProgress={setProgress}
                    pageSize={pageSize}
                    country="in"
                    category={element}
                    mode={mode}
                  />
                </Route>
              );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
