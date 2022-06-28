import React, { Component } from "react";
import studentDataService from "../services/student.service";
import { Link } from "react-router-dom";
import Select from 'react-select';
import "../App.css";

export default class StudentsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchname = this.onChangeSearchname.bind(this);
    this.retrievestudents = this.retrievestudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivestudent = this.setActivestudent.bind(this);
    this.removeAllstudents = this.removeAllstudents.bind(this);
    this.searchname = this.searchname.bind(this);
    this.selectGraduationYear = this.selectGraduationYear.bind(this);
    this.selectStudentClass = this.selectStudentClass.bind(this);
    this.selectHouse = this.selectHouse.bind(this);
    this.selectSubject = this.selectSubject.bind(this);

    this.state = {
      students: [],
      currentstudent: null,
      currentIndex: -1,
      searchname: "",
      gradYear:"",
      studentClass:"",
      subject:"",
      house:""
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

  selectGraduationYear(value) {
    console.log(this.state.gradYear);
    this.setState({
      currentstudent: null,
      currentIndex: -1,
      //gradYear:value["value"]
    });

    studentDataService.findByGraduationYear(value["value"])
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

  selectStudentClass(value) {
    console.log(this.state.studentClass);
    this.setState({
      currentstudent: null,
      currentIndex: -1,
    });

    studentDataService.findByStudentClass(value["value"])
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

  selectHouse(value) {
    console.log(this.state.house);
    this.setState({
      currentstudent: null,
      currentIndex: -1,
    });

    studentDataService.findByHouse(value["value"])
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


  selectSubject(option) {
    this.setState(state => {
      return {
        subject: option
      };
    });
    console.log(option);
  }

  /** 
  selectSubject(value) {
    console.log(this.state.subject);
    console.log(value);
    this.setState({
      currentstudent: null,
      currentIndex: -1,
    });

    studentDataService.findBySubject(value["value"])
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
*/

selectGraduate(value) {
  this.setState({
    currentstudent: null,
    currentIndex: -1,
  });

  studentDataService.findByGraduate(value["value"])
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
    const s_GraduationYear = [
      { value: '', label: 'All Year' },
      { value: '2022', label: '2022' },
      { value: '2023', label: '2023' },
      { value: '2024', label: '2024' },
      { value: '2025', label: '2025' }
    ]
    const s_Class = [
      { value: '', label: 'All Class' },
      { value: 'Prime', label: 'Prime' },
      { value: 'Royal', label: 'Royal' },
      { value: 'Imperial', label: 'Imperial' }
    ]
    const s_Subject = [
      { value: '', label: 'All Subject' },
      { value: 'Math', label: 'Math' },
      { value: 'English', label: 'English' },
      { value: 'Kiswahili', label: 'Kiswahili' },
      { value: 'Physics', label: 'Physics' }
    ]
    const s_House = [
      { value: '', label: 'All House' },
      { value: 'Mirror', label: 'Mirror' },
      { value: 'Savvy', label: 'Savvy' },
      { value: 'Noble', label: 'Noble' },
      { value: 'Competent', label: 'Competent' }
    ]
    const s_Term = [
      { value: '202201', label: '202201' },
      { value: '202103', label: '202103' }
    ]

    return (
      <div className="row">
        <div className="col-md-2">
          <div className="container">
            <div id="root">
              <Select className="mt-4" label="graduationYear" defaultInputValue="All Year" options={s_GraduationYear} 
                //value={this.state.gradYear}
                //onChange={value => this.setState({gradYear: value})}
                //onFocus={value=>this.selectGraduationYear(value)}
                onChange={value=>this.selectGraduationYear(value)}
                allowClear
              />
            </div>
            <div id="root">
              <Select className="mt-4" label="studentClass" defaultInputValue="All Class" options={s_Class} 
                onChange={value=>this.selectStudentClass(value)}
                allowClear
              />
            </div>
            <div id="root">
              <Select className="mt-4" label="house" defaultInputValue="All House" options={s_House}
                onChange={value=>this.selectHouse(value)}
                allowClear
              />
            </div>
            <p></p>
            <div id="root">
              <Select
                isMulti
                name="subjects"
                defaultInputValue="All Subject"
                options={s_Subject}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={value=>this.selectStudentClass(value)}
              />
            </div>
            <div id="root">
              <label>
                <input
                  type="checkbox"
                  checked={this.state.graduated}
                  //onChange={selectGraduate}
                />
                Graduated
              </label>
            </div>
            <br></br>
            <br></br>
            <div id="root">
              <Select
                name="term"
                defaultInputValue="202201"
                options={s_Term}
                className="basic-multi-select"
                classNamePrefix="select"
                //onChange={value=>this.selectStudentClass(value)}
              />
            </div>
            <button
                className="m-3 btn btn-sm btn-danger"
                //onClick={this.removeAllstudents}
              >
                Generate Report
            </button>
              <Link
              to={"/addStudents"}
              className="m-3 btn btn-sm btn-danger"
            >
              Add Student
            </Link>
            <button
                  className="m-3 btn btn-sm btn-danger"
                  //onClick={this.removeAllstudents}
                >
                  Remove All
            </button>
          </div>
        </div>

        <div className="col-md-10">
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

          <div className="row">
            <div className="col-md-5">
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
                      {student.id} {student.name} Form:{student.form} {student.studentClass} {student.graduationYear}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="col-md-5">
              {currentstudent ? (
                <div>
                  <h4>Student</h4>
                  <div>
                  <img className="img-fluid" 
                    src={`${process.env.PUBLIC_URL}/assets/pfp/${currentstudent.id}.png`} 
                    width="180" height="250"
                    alt="student_profile_pic"/>
                  </div>
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
                      <strong>Graduation Year:</strong>
                    </label>{" "}
                    {currentstudent.graduationYear}
                  </div>
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentstudent.graduated ? "Graduated" : "In School"}
                  </div>

                  <Link
                    to={"/students/" + currentstudent.id}
                    className="btn btn-outline-primary"
                  >
                    View Performance
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
        </div>
      </div>
    );
  }
}
