import React, { Component } from "react";
import studentDataService from "../services/student.service";
//import examDataService from "../services/exam.service";
import { Link } from "react-router-dom";
import Select from 'react-select';
import "./addExam.css";

const checkboxes = [
  'Math', 'Kiswahili', 'English', 'Chemistry','Biology','Physics','Theory','Agriculture','Business','Computer','Geography','History'
];
export default class addExam extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.selectGraduationYear = this.selectGraduationYear.bind(this);
        this.selectStudentClass = this.selectStudentClass.bind(this);

        this.state = {
            gradYear:"",
            studentClass:"",
            checkedItems: new Map(),
            examTime:"",

            submitted: false
        };
    }

   handleChange=(e)=> {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    console.log(item);
    }

  selectGraduationYear(value) {
    console.log(this.state.gradYear);
    this.setState({
      gradYear:value["value"]
    });
  }

  selectStudentClass(value) {
    console.log(this.state.studentClass);
    this.setState({
      studentClass:value["value"]
    });
  }

  saveExam() {
    var data = {
      gradYear: this.state.gradYear,
      studentClass: this.state.studentClass,
      checkedItems: this.state.checkedItems,
      examTime: this.state.examTime
    };

    studentDataService.create(data)
      .then(response => {
        this.setState({
          gradYear: response.data.gradYear,
          studentClass: response.data.studentClass,
          checkedItems: response.data.checkedItems,
          examTime: response.data.examTime,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {   
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

    console.log(this.state.checkedItems) 
    return (
    <div className="body">
        {this.state.submitted ?
            (
                <div>
                    <h4>Activity record added successfully!</h4>
                    <h4>Thank you, teacher!</h4>
                    <button className="btn btn-success" onClick={this.newReport}>
                    Add Another
                    </button>
                </div>
            ):(
          <><div className="row">
                        <div className="col-md-1">
                            <h3 htmlFor="exam">Exam</h3>
                        </div>
                        <div className="col-md-4">
                            <h5 htmlFor="warning" style={{ color: 'grey', marginLeft: '18px', marginBottom: '20px', 'marginTop': '10px' }}>For Teacher Kennedy Only</h5>
                        </div>
                    </div><div className="row">
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
                                        marginBottom="10px" />
                                    <p style={{ color: 'red', fontSize: '12px', margin: '0px' }}> Format: School Year and Term</p>
                                    <p style={{ color: 'grey', fontSize: '12px', margin: '0px' }}> Ex: School Year 2022 Term 1 then you input 202201</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="root">
                                    <Select className="mt-4" label="graduationYear" defaultInputValue="All Year" options={s_GraduationYear}
                                        onChange={value => this.selectGraduationYear(value)}
                                        allowClear />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div id="root">
                                    <Select className="mt-4" label="studentClass" defaultInputValue="All Class" options={s_Class}
                                        onChange={value => this.selectStudentClass(value)}
                                        allowClear />
                                </div>
                            </div>
                        </div></>
            )}{
            checkboxes.map(item => (
                <div className="row">
                    <div className="col-md-2">
                        <input type="checkbox"
                        checked={this.state.checkedItems.get(item)} 
                        onChange={this.handleChange} 
                        name={item}/>
                        <label key={item}>
                        {item}
                        </label>
                    </div>
                    <div className="col-md-2">
                        <input
                            type="text"
                            className="form-control"
                            id="paper1"
                            required
                            disabled={!this.state.checkedItems.get(item)}
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
                            disabled={!this.state.checkedItems.get(item)}
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
                            disabled={!this.state.checkedItems.get(item)}
                            //value={this.state.reportTime}
                            //onChange={this.onChangeReportTime}
                            name="paper3"
                            placeholder="Paper 3 Full Score"
                            marginBottom="10px"
                        />
                    </div>
                </div>
          ))
        }
        <div class="text-right">
            <Link
                to={"/students/"}
                className="btn btn-outline-primary"
                onClick={this.saveExam}
            >
                Submit
            </Link>
        </div>
    </div>
    );
  }
}
