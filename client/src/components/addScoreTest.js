import React, { Component } from "react";
import studentDataService from "../services/student.service";
//import examDataService from "../services/exam.service";
import { Link } from "react-router-dom";
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default class addScore extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchname = this.onChangeSearchname.bind(this);
    this.retrievestudents = this.retrievestudents.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivestudent = this.setActivestudent.bind(this);
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
      { value: 'All Class', label: 'All Class' },
      { value: 'Prime', label: 'Prime' },
      { value: 'Royal', label: 'Royal' },
      { value: 'Imperial', label: 'Imperial' }
    ]
    const s_Subject = [
      { value: 'All Subject', label: 'All Subject' },
      { value: 'Math', label: 'Math' },
      { value: 'English', label: 'English' },
      { value: 'Kiswahili', label: 'Kiswahili' },
      { value: 'Physics', label: 'Physics' }
    ]
    const s_House = [
      { value: 'All House', label: 'All House' },
      { value: 'Mirror', label: 'Mirror' },
      { value: 'Savvy', label: 'Savvy' },
      { value: 'Noble', label: 'Noble' },
      { value: 'Competent', label: 'Competent' }
    ]

    const columns = [{
        dataField: 'id',
        text: 'Student ID'
      }, {
        dataField: 'name',
        text: 'Name'
      }];

    return (
      <div className="row">
        <h3 htmlFor="score">Score</h3>
          <div className="container">
              <div className="row">
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
                <Select className="mt-4" label="subject" defaultInputValue="All Subject" options={s_Subject}
                    onChange={value=>this.selectSubject(value)}
                    allowClear
                />
                </div>
            </div>

            
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
          </div>

          <div className="row">
            <div className="col-md-6">
              <h4>Selected Students</h4>

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
                      {student.id} {student.name} Form:{student.form} {student.studentClass}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="col-md-6">
              {currentstudent ? (
                <div>
                  <h4>Score</h4>
                  <div>
                    <label>
                      <strong>Full Name:</strong>
                    </label>{" "}
                    {currentstudent.name}
                  </div>
                  <div>
                    <label>
                      <strong>Paper 1:</strong>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="paper1"
                        required
                        //value={this.state.subject.paper1}
                        //onChange={this.onChangeSubejct}
                        name="paper1"
                    />
                  </div>
                  <div>
                    <label>
                      <strong>Paper 2:</strong>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="paper2"
                        required
                        //value={this.state.subject.paper2}
                        //onChange={this.onChangeSubejct}
                        name="paper2"
                    />
                  </div>
                  <div>
                    <label>
                      <strong>Paper 3:</strong>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="paper3"
                        required
                        //value={this.state.subject.paper3}
                        //onChange={this.onChangeSubejct}
                        name="paper3"
                    />
                  </div>

                  <div>
                    <label>
                      <strong>Comments:</strong>
                    </label>
                    <textarea
                        rows="3"
                        type="text"
                        className="form-control"
                        id="comments"
                        required
                        //value={this.state.subject.paper3}
                        //onChange={this.onChangeSubejct}
                        name="comments"
                    />
                  </div>

                  <Link
                    to={"/students/" + currentstudent.id}
                    className="btn btn-outline-primary"
                  >
                    Submit
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
    );
  }
}
