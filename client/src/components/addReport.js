import React, { Component } from "react";
import reportDataService from "../services/report.service";

export default class addReport extends Component {
  constructor(props) {
    super(props);
    // need to add in select student
    this.onChangeReportTime = this.onChangeReportTime.bind(this);
    this.onChangeStudentid = this.onChangeStudentid.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeComments = this.onChangeComments.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.newReport = this.newReport.bind(this);
    // need to add in time input year+term

    this.state = {
      studentid: null,
      title: "",
      comments: "", 
      teacher: "",
      reportTime:"",
      submitted: false
    };
  }

  onChangeStudentid(e) {
    this.setState({
      studentid: e.target.value
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeComments(e) {
    this.setState({
      comments: e.target.value
    });
  }

  onChangeTeacher(e) {
    this.setState({
      teacher: e.target.value
    });
  }

  onChangeReportTime(e) {
    this.setState({
      reportTime: e.target.value
    });
  }

  saveReport() {
    var data = {
      studentid: this.state.studentid,
      title: this.state.title,
      comments: this.state.comments,
      teacher: this.state.teacher,
      reportTime: this.state.reportTime
    };

    reportDataService.create(data)
      .then(response => {
        this.setState({
          studentid: response.data.studentid,
          title: response.data.title,
          comments: response.data.comments,
          teacher: response.data.teacher,
          reportTime: response.data.reportTime,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newReport() {
    this.setState({
      studentid: null,
      title: "",
      comments: "",
      teacher: "",
      reportTime:"",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Teacher's report added successfully!</h4>
            <h4>Thank you, teacher!</h4>
            <button className="btn btn-success" onClick={this.newReport}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
            <h3 htmlFor="report">Teacher's Report</h3>
              <label htmlFor="reportTime">Report Time</label>
              <p style={{ color: 'red',fontSize:'12px',margin:'0px' }}> Format: School Year and Term</p>
              <p style={{ color: 'grey',fontSize:'12px',margin:'0px'  }}> Ex: School Year 2022 Term 1 then you input 202201</p>
              <input
                type="text"
                className="form-control"
                id="reportTime"
                required
                value={this.state.reportTime}
                onChange={this.onChangeReportTime}
                name="reportTime"
              />
            </div>

            <div className="form-group">
              <label htmlFor="studentid">Student ID</label>
              <input
                type="text"
                className="form-control"
                id="studentid"
                required
                value={this.state.studentid}
                onChange={this.onChangeStudentid}
                name="studentid"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <textarea
                rows="3"
                className="form-control"
                id="comments"
                required
                value={this.state.comments}
                onChange={this.onChangeComments}
                name="comments"
              />
            </div>

            <div className="form-group">
              <label htmlFor="teacher">Teacher</label>
              <input
                type="text"
                className="form-control"
                id="teacher"
                required
                value={this.state.teacher}
                onChange={this.onChangeTeacher}
                name="teacher"
              />
            </div>

            <div class="text-right">
                <button onClick={this.saveReport} className="btn btn-success">
                Submit
                </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
