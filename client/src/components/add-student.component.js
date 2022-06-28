import React, { Component } from "react";
import studentDataService from "../services/student.service";

export default class addStudent extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear.bind(this);
    this.onChangeStudentClass = this.onChangeStudentClass.bind(this);
    this.onChangeHouse = this.onChangeHouse.bind(this);
    this.savestudent = this.savestudent.bind(this);
    this.newstudent = this.newstudent.bind(this);

    this.state = {
      id: null,
      name: "",
      form: "", 
      graduationYear: "",
      studentClass:"",
      house:"",
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

  onChangeStudentClass(e) {
    this.setState({
      studentClass: e.target.value
    });
  }

  onChangeHouse(e) {
    this.setState({
      house: e.target.value
    });
  }

  savestudent() {
    var data = {
      name: this.state.name,
      form: this.state.form,
      graduationYear: this.state.graduationYear,
      studentClass: this.state.studentClass,
      house: this.state.house
    };

    studentDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          form: response.data.form,
          graduationYear: response.data.graduationYear,
          studentClass: response.data.studentClass,
          house: response.data.house,
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
      studentClass:"",
      house:"",
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

            <div className="form-group">
              <label htmlFor="studentClass">Class</label>
              <input
                type="text"
                className="form-control"
                id="studentClass"
                required
                value={this.state.studentClass}
                onChange={this.onChangeStudentClass}
                name="studentClass"
              />
            </div>

            <div className="form-group">
              <label htmlFor="house">House of Wisdom</label>
              <input
                type="text"
                className="form-control"
                id="house"
                required
                value={this.state.house}
                onChange={this.onChangeHouse}
                name="house"
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
