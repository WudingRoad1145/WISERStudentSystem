import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default class add extends Component {

  render() {
    return (
      <div className="list row" justify-content="space-between">
          <Link to={"/addExam"} className="btn btn-secondary btn-square-xl-secondary">Add Exam</Link>
          <Link to={"/addScore"} className="btn btn-primary btn-square-xl-secondary">Upload Score</Link>
          <Link to={"/addActivity"} className="btn btn-primary btn-square-xl-secondary">Add Activity</Link>
          <Link to={"/addReport"} className="btn btn-primary btn-square-xl-secondary">Teacher's Report</Link>
          <Link to={"/addGraduate"} className="btn btn-primary btn-square-xl-secondary">Graduate</Link>
      </div>
    );
  }
}
