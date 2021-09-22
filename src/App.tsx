/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Navbar from "./components/layout/navbar/navbar";
import Footer from "./components/layout/footer/footer";
import Assignments from "./components/assignments/Assignments";
import Todo from "./components/todo/todo";
import { Status } from "./hooks/assignment-hook";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [filter, setFilter] = useState<Status>();

  return (
    <Router>
      <Navbar />

      <Switch>
        <Route exact path="/">
          <Assignments statusFilter={filter} />
        </Route>

        <Route path="/todo">
          <Todo />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
