import React, { Component } from "react";
import studentDataService from "../services/student.service";

export default class Addstudent extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear(this);
    this.savestudent = this.savestudent.bind(this);
    this.newstudent = this.newstudent.bind(this);

    this.state = {
      id: null,
      name: "",
      form: "", 
      graduationYear: "",
      graduated: false,
      submitted: false
    };
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeForm(e) {
    this.setState({
      form: e.target.value
    });
  }

  onChangeGraduationYear(e) {
    this.setState({
      graduationYear: e.target.value
    });
  }

  savestudent() {
    var data = {
      name: this.state.name,
      form: this.state.form,
      graduationYear: this.state.graduationYear
    };

    studentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          form: response.data.form,
          graduationYear: response.data.graduationYear,
          graduated: response.data.graduated,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newstudent() {
    this.setState({
      id: null,
      name: "",
      form: "",
      graduationYear: "",
      graduated: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newstudent}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Student Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangename}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="form">Form</label>
              <input
                type="text"
                className="form-control"
                id="form"
                required
                value={this.state.form}
                onChange={this.onChangeForm}
                name="form"
              />
            </div>

            <div className="form-group">
              <label htmlFor="graduationYear">Graduation Year</label>
              <input
                type="text"
                className="form-control"
                id="graduationYear"
                required
                value={this.state.graduationYear}
                onChange={this.onChangeGraduationYear}
                name="graduationYear"
              />
            </div>

            <button onClick={this.savestudent} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
