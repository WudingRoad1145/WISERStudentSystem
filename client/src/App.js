import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Addstudent from "./components/add-student.component";
import student from "./components/student.component";
import studentsList from "./components/student-list.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/students"} className="navbar-brand">
            Wiser
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/students"} className="nav-link">
                All Students
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/students"]} component={studentsList} />
            <Route exact path="/add" component={Addstudent} />
            <Route path="/students/:id" component={student} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
