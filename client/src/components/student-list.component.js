import React, { Component } from "react";
import studentDataService from "../services/student.service";
import { Link } from "react-router-dom";

export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchname = this.onChangeSearchname.bind(this);
    this.retrievestudents = this.retrievestudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivestudent = this.setActivestudent.bind(this);
    this.removeAllstudents = this.removeAllstudents.bind(this);
    this.searchname = this.searchname.bind(this);

    this.state = {
      students: [],
      currentstudent: null,
      currentIndex: -1,
      searchname: ""
    };
  }

  componentDidMount() {
    this.retrievestudents();
  }

  onChangeSearchname(e) {
    const searchname = e.target.value;

    this.setState({
      searchname: searchname
    });
  }

  retrievestudents() {
    studentDataService.getAll()
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievestudents();
    this.setState({
      currentstudent: null,
      currentIndex: -1
    });
  }

  setActivestudent(student, index) {
    this.setState({
      currentstudent: student,
      currentIndex: index
    });
  }

  removeAllstudents() {
    studentDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchname() {
    this.setState({
      currentstudent: null,
      currentIndex: -1
    });

    studentDataService.findByname(this.state.searchname)
      .then(response => {
        this.setState({
          students: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchname, students, currentstudent, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by student name"
              value={searchname}
              onChange={this.onChangeSearchname}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchname}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>All Students</h4>

          <ul className="list-group">
            {students &&
              students.map((student, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivestudent(student, index)}
                  key={index}
                >
                  {student.id} {student.name} {student.form}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllstudents}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentstudent ? (
            <div>
              <h4>Student</h4>
              <div>
                <label>
                  <strong>Full Name:</strong>
                </label>{" "}
                {currentstudent.name}
              </div>
              <div>
                <label>
                  <strong>Form:</strong>
                </label>{" "}
                {currentstudent.form}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentstudent.graduated ? "Graduated" : "In School"}
              </div>

              <Link
                to={"/students/" + currentstudent.id}
                className="badge badge-warning"
              >
                More
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click to select a student...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
