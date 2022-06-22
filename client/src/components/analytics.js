import React, { Component } from "react";
import studentDataService from "../services/student.service";

export default class analytics extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear.bind(this);
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
      <div className="list row">
          <p>In construction...</p>
      </div>
    );
  }
}
