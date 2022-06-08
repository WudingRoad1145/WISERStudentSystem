import React, { Component } from "react";
import studentDataService from "../services/student.service";

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear.bind(this);
    this.getstudent = this.getstudent.bind(this);
    this.updateGraduated = this.updateGraduated.bind(this);
    this.updatestudent = this.updatestudent.bind(this);
    this.deletestudent = this.deletestudent.bind(this);

    this.state = {
      currentstudent: {
        id: null,
        name: "",
        form: "",
        graduationYear: "",
        graduated: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getstudent(this.props.match.params.id);
  }

  onChangename(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentstudent: {
          ...prevState.currentstudent,
          name: name
        }
      };
    });
  }

  onChangeForm(e) {
    const form = e.target.value;
    
    this.setState(prevState => ({
      currentstudent: {
        ...prevState.currentstudent,
        form: form
      }
    }));
  }

  onChangeGraduationYear(e) {
    const graduationYear = e.target.value;
    
    this.setState(prevState => ({
      currentstudent: {
        ...prevState.currentstudent,
        graduationYear: graduationYear
      }
    }));
  }

  getstudent(id) {
    studentDataService.get(id)
      .then(response => {
        this.setState({
          currentstudent: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateGraduated(status) {
    var data = {
      id: this.state.currentstudent.id,
      name: this.state.currentstudent.name,
      form: this.state.currentstudent.form,
      graduationYear:this.state.currentstudent.graduationYear,
      graduated: status
    };

    studentDataService.update(this.state.currentstudent.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentstudent: {
            ...prevState.currentstudent,
            graduated: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatestudent() {
    studentDataService.update(
      this.state.currentstudent.id,
      this.state.currentstudent
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The student info was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletestudent() {    
    studentDataService.delete(this.state.currentstudent.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/students')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentstudent } = this.state;

    return (
      <div>
        {currentstudent ? (
          <div className="edit-form">
            <h4>Student</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentstudent.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label htmlFor="form">Form</label>
                <input
                  type="text"
                  className="form-control"
                  id="form"
                  value={currentstudent.form}
                  onChange={this.onChangeForm}
                />
              </div>
              <div className="form-group">
                <label htmlFor="graduationYear">Graduation Year</label>
                <input
                  type="text"
                  className="form-control"
                  id="graduationYear"
                  value={currentstudent.graduationYear}
                  onChange={this.onChangeGraduationYear}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentstudent.graduated ? "Graduated" : "In School"}
              </div>
            </form>

            {currentstudent.graduated ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateGraduated(false)}
              >
                In School
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateGraduated(true)}
              >
                Graduated
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletestudent}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updatestudent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click to select a student...</p>
          </div>
        )}
      </div>
    );
  }
}
