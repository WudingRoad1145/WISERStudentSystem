import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import addStudent from "./components/add-student.component";
import student from "./components/student.component";
import studentsList from "./components/student-list.component";
import teacherLogin from "./components/authentication";
import addReport from "./components/addReport";
import addActivity from "./components/addActivity";
import addGraduate from "./components/addGraduate";
import analytics from "./components/analytics";
import add from "./components/add";

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
              <Link to={"/analytics"} className="nav-link">
                Analytics
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Records
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={"/"} component={teacherLogin}/>
            <Route exact path={"/students"} component={studentsList} />
            <Route exact path="/addStudents" component={addStudent} />
            <Route path="/add" component={add} />
            <Route exact path="/addReport" component={addReport} />
            <Route exact path="/addActivity" component={addActivity} />
            <Route exact path="/addGraduate" component={addGraduate} />
            <Route path="/analytics" component={analytics} />
            <Route path="/students/:id" component={student} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
