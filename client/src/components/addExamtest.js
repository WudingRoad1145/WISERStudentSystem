import React, { Component } from "react";
import studentDataService from "../services/student.service";
//import examDataService from "../services/exam.service";
import { Link } from "react-router-dom";
import Select from 'react-select';
import "./addExam.css";

export default class addExam extends Component {
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

    return (
    <div className="body">
        <div className="row">
            <div className="col-md-1">
                <h3 htmlFor="exam">Exam</h3>
            </div>
            <div className="col-md-4">
                <h5 htmlFor="warning" style={{ color: 'grey',marginLeft:'18px',marginBottom:'20px','marginTop':'10px'}}>For Teacher Kennedy Only</h5>
            </div>
        </div>
        <div className="row">
            <div className="col-md-2">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="reportTime"
                        required
                        value={this.state.reportTime}
                        onChange={this.onChangeReportTime}
                        name="reportTime"
                        placeholder="Report Time"
                        marginBottom="10px"
                    />
                    <p style={{ color: 'red',fontSize:'12px',margin:'0px' }}> Format: School Year and Term</p>
                    <p style={{ color: 'grey',fontSize:'12px',margin:'0px'  }}> Ex: School Year 2022 Term 1 then you input 202201</p>
                </div>
            </div>
            <div className="col-md-2">
                <div id="root">
                    <Select className="mt-4" label="graduationYear" defaultInputValue="All Year" options={s_GraduationYear} 
                        //value={this.state.gradYear}
                        //onChange={value => this.setState({gradYear: value})}
                        //onFocus={value=>this.selectGraduationYear(value)}
                        onChange={value=>this.selectGraduationYear(value)}
                        allowClear
                    />
                </div>
            </div>
            <div className="col-md-2">
                <div id="root">
                    <Select className="mt-4" label="studentClass" defaultInputValue="All Class" options={s_Class} 
                        onChange={value=>this.selectStudentClass(value)}
                        allowClear
                    />
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h4>Selected Subjects</h4>
                </div>
                <div className="container">
                    <div className="row">
                    <div className="col-md-1">
                        <h5>Math</h5> 
                    </div>
                    <label>
                        Checkbox:
                        <input
                        name="checkbox"
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                                if(checked){
                                setText('')
                                }
                            setChecked(!checked)
                            }
                        }
                        />
                    </label>
                    <label>
                    Input:
                        <input
                        name="input"
                        type="text"
                        disabled={!checked}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        />
                    </label>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            id="paper1"
                            required
                            //value={this.state.reportTime}
                            //onChange={this.onChangeReportTime}
                            name="paper1"
                            placeholder="Paper 1 Full Score"
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            id="paper2"
                            required
                            //value={this.state.reportTime}
                            //onChange={this.onChangeReportTime}
                            name="paper2"
                            placeholder="Paper 2 Full Score"
                            marginBottom="10px"
                        />
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            id="paper3"
                            required
                            //value={this.state.reportTime}
                            //onChange={this.onChangeReportTime}
                            name="paper3"
                            placeholder="Paper 3 Full Score"
                            marginBottom="10px"
                        />
                    </div>
                </div>
            </div>



                    <div className="container">
                        <div className="row">
                        <div className="col-md-1">
                            <h5>Kiswahili</h5> 
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper1"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper1"
                                placeholder="Paper 1 Full Score"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper2"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper2"
                                placeholder="Paper 2 Full Score"
                                marginBottom="10px"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper3"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper3"
                                placeholder="Paper 3 Full Score"
                                marginBottom="10px"
                            />
                        </div>
                        </div>
                    </div>

                <div className="container">
                        <div className="row">
                        <div className="col-md-1">
                            <h5>English</h5> 
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper1"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper1"
                                placeholder="Paper 1 Full Score"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper2"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper2"
                                placeholder="Paper 2 Full Score"
                                marginBottom="10px"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper3"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper3"
                                placeholder="Paper 3 Full Score"
                                marginBottom="10px"
                            />
                        </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                        <div className="col-md-1">
                            <h5>Physics</h5> 
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper1"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper1"
                                placeholder="Paper 1 Full Score"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper2"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper2"
                                placeholder="Paper 2 Full Score"
                                marginBottom="10px"
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="text"
                                className="form-control"
                                id="paper3"
                                required
                                //value={this.state.reportTime}
                                //onChange={this.onChangeReportTime}
                                name="paper3"
                                placeholder="Paper 3 Full Score"
                                marginBottom="10px"
                            />
                        </div>
                        </div>
                    </div>






                </div>
                <div class="text-right">
                    <Link
                            to={"/students/"}
                            className="btn btn-outline-primary"
                        >
                            Submit
                        </Link>
                </div>
            </div>
        </div>
    );
  }
}
