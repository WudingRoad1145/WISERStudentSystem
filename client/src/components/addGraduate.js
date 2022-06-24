import React, { Component } from "react";
import graduateDataService from "../services/graduate.service";

export default class addGraduate extends Component {
  constructor(props) {
    super(props);
    // need to add in select student
    this.onChangeReportTime = this.onChangeReportTime.bind(this);
    this.onChangeStudentid = this.onChangeStudentid.bind(this);
    this.onChangeUniversity = this.onChangeUniversity.bind(this);
    this.onChangeMajor = this.onChangeMajor.bind(this);
    this.onChangeMarriage = this.onChangeMarriage.bind(this);
    this.onChangeChildren = this.onChangeChildren.bind(this);
    this.onChangeJob = this.onChangeJob.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.saveReport = this.saveReport.bind(this);
    this.newReport = this.newReport.bind(this);
    // need to add in time input year+term

    this.state = {
      studentid: null,
      university: "",
      major: "", 
      note:"",
      job: "",
      marriage:"",
      children:"",
      reportTime:"",
      submitted: false
    };
  }

  onChangeStudentid(e) {
    this.setState({
      studentid: e.target.value
    });
  }

  onChangeUniversity(e) {
    this.setState({
      university: e.target.value
    });
  }

  onChangeMajor(e) {
    this.setState({
      major: e.target.value
    });
  }

  onChangeNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  onChangeJob(e) {
    this.setState({
      job: e.target.value
    });
  }

  onChangeMarriage(e) {
    this.setState({
      marriage: e.target.value
    });
  }

  onChangeChildren(e) {
    this.setState({
      children: e.target.value
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
      university: this.state.university,
      major: this.state.major,
      note: this.state.note,
      job: this.state.job,
      marriage: this.state.marriage,
      children: this.state.children,
      reportTime: this.state.reportTime
    };

    graduateDataService.create(data)
      .then(response => {
        this.setState({
          studentid: response.data.studentid,
          university: response.data.university,
          major: response.data.major,
          note: response.data.note,
          job: response.data.job,
          marriage: response.data.marriage,
          children: response.data.children,
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
      university: "",
      major:"",
      note: "",
      job: "",
      marriage:"",
      children:"",
      reportTime:"",

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Graduate record added successfully!</h4>
            <h4>Thank you, teacher!</h4>
            <button className="btn btn-success" onClick={this.newReport}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className="col-md-12">
            <h3 htmlFor="graduate">Graduate</h3>
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
            </div>

            <div className="col-md-12">
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
            </div>
            
            <div className="list row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="university">University</label>
                    <input
                        type="text"
                        className="form-control"
                        id="university"
                        required
                        value={this.state.university}
                        onChange={this.onChangeUniversity}
                        name="university"
                    />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="Major">Major</label>
                    <input
                        type="text"
                        className="form-control"
                        id="major"
                        required
                        value={this.state.major}
                        onChange={this.onChangeMajor}
                        name="major"
                    />
                    </div>
                </div>
                
                <div className="col-md-12">
                    <div className="form-group">
                    <label htmlFor="job">Job</label>
                    <input
                        type="text"
                        className="form-control"
                        id="job"
                        required
                        value={this.state.job}
                        onChange={this.onChangeJob}
                        name="job"
                    />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                    <label htmlFor="marriage">Marriage Status</label>
                    <input
                        type="text"
                        className="form-control"
                        id="marriage"
                        required
                        value={this.state.marriage}
                        onChange={this.onChangeMarriage}
                        name="marriage"
                    />
                    </div>
                </div>

                <div className="col-md-6" padding="-10px">
                    <div className="form-group">
                    <label htmlFor="children">Children</label>
                    <input
                        type="text"
                        className="form-control"
                        id="children"
                        required
                        value={this.state.children}
                        onChange={this.onChangeChildren}
                        name="children"
                    />
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="form-group">
                    <label htmlFor="Note">Note</label>
                    <textarea 
                        id="note"
                        className="form-control" 
                        rows="3"
                        value={this.state.note}
                        onChange={this.onChangeNote}
                        name="note"
                        />
                    </div>
                </div>
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
