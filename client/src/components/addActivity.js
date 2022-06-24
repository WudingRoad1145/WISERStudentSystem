import React, { Component } from "react";
import activityDataService from "../services/activity.service";

export default class addActivity extends Component {
  constructor(props) {
    super(props);
    // need to add in select student
    this.onChangeReportTime = this.onChangeReportTime.bind(this);
    this.onChangeStudentid = this.onChangeStudentid.bind(this);
    this.onChangeEvent = this.onChangeEvent.bind(this);
    this.onChangeAward = this.onChangeAward.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeTeacher = this.onChangeTeacher.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.newReport = this.newReport.bind(this);
    // need to add in time input year+term

    this.state = {
      studentid: null,
      event: "",
      award: "", 
      description:"",
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

  onChangeEvent(e) {
    this.setState({
      event: e.target.value
    });
  }

  onChangeAward(e) {
    this.setState({
      award: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
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
      event: this.state.event,
      award: this.state.award,
      description: this.state.description,
      teacher: this.state.teacher,
      reportTime: this.state.reportTime
    };

    activityDataService.create(data)
      .then(response => {
        this.setState({
          studentid: response.data.studentid,
          event: response.data.event,
          award: response.data.award,
          description: response.data.description,
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
      event: "",
      award:"",
      description: "",
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
            <h4>Activity record added successfully!</h4>
            <h4>Thank you, teacher!</h4>
            <button className="btn btn-success" onClick={this.newReport}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <h3 htmlFor="activity">Activity</h3>
            <div className="form-group">
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
              <label htmlFor="event">Event</label>
              <input
                type="text"
                className="form-control"
                id="event"
                required
                value={this.state.event}
                onChange={this.onChangeEvent}
                name="event"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Award">Award</label>
              <input
                type="text"
                className="form-control"
                id="award"
                required
                value={this.state.award}
                onChange={this.onChangeAward}
                name="award"
              />
            </div>

            <div className="form-group">
              <label htmlFor="Description">Description</label>
              <textarea 
                rows="3"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
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
