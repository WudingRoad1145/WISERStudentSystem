import React, { Component } from "react";
import studentDataService from "../services/student.service";
import Select from 'react-select';
import { MDBContainer } from "mdbreact";
import { Bar } from "react-chartjs-2";
//import Chart from 'chart.js/auto';
import "./student.css";
import studentChart from './studentChart.js';

export default class Student extends Component {
  constructor(props) {
    super(props);
    this.onChangename = this.onChangename.bind(this);
    this.onChangeForm = this.onChangeForm.bind(this);
    this.onChangeGraduationYear = this.onChangeGraduationYear.bind(this);
    this.onChangeStudentClass = this.onChangeStudentClass.bind(this);
    this.onChangeHouse = this.onChangeHouse.bind(this);
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
        studentClass:"",
        house:"",
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

  onChangeStudentClass(e) {
    const studentClass = e.target.value;
    
    this.setState(prevState => ({
      currentstudent: {
        ...prevState.currentstudent,
        studentClass: studentClass
      }
    }));
  }

  onChangeHouse(e) {
    const house = e.target.value;
    
    this.setState(prevState => ({
      currentstudent: {
        ...prevState.currentstudent,
        house: house
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
      studentClass:this.state.currentstudent.studentClass,
      house:this.state.currentstudent.house,
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
    const s_Term = [
      { value: '202201', label: '202201' },
      { value: '202103', label: '202103' },
      { value: '', label: 'All' }
    ]

      // Sample data
    const data = {
      labels: ["KCPE", "F1T1", "F1T2",
        "F1T3", "F2T1", "F2T2", "F2T3","F3T1"],
      datasets: [
        {
          label: "Final Letter Grade",
          data: [7, 8,9, 8, 10, 8, 10, 11],
          fill: true,
          backgroundColor: "rgba(6, 156,51, .3)",
          borderColor: "#02b844",
        }
      ]
    }

    const yLabels = {
      12: 'A', 11 : 'A-', 10 : 'B+', 9: 'B', 8 : 'B-',
      7 : 'C+', 6 : 'C', 5 : 'C-', 4 : 'D+',
      3 : 'D', 2 : 'D-', 1:'E'
    }
    const option= {
      responsive: true,
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true,
                  callback: function(value, index, values) {
                      return yLabels[value];
                    }
                }
            }]
        }
    }

    return (
      <div>
        {currentstudent ? (
          <div className="row">
          <div className="col-md-2">
            <div className="row">
              <form>
                <div className="col-md-12">
                  <h4>{currentstudent.name}</h4>
                </div>
                <h5>Personal Info</h5>
                <div class="text-middle">
                  <img className="img-fluid" 
                    src={`${process.env.PUBLIC_URL}/assets/pfp/${currentstudent.id}.png`} 
                    width="120" height="180"
                    alt="student_profile_pic"/>
                </div>
                <row>
                  <label htmlFor="form"><strong>Form: </strong>{currentstudent.form}&nbsp; &nbsp; </label>
                  <label htmlFor="studentClass"><strong>Class: </strong>{currentstudent.studentClass}&nbsp; &nbsp; </label>
                  <br></br>
                  <label htmlFor="graduationYear"><strong>Graduation Year: </strong>{currentstudent.graduationYear}&nbsp; &nbsp; </label>
                  <label htmlFor="house"><strong>House: </strong>{currentstudent.house}&nbsp; &nbsp; </label>
                  <br></br>
                  <label>
                    <strong>Status: </strong> {currentstudent.graduated ? "Graduated" : "In School"}
                  </label>
                </row>
              </form>
              <div className="container">
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
            </div>
          </div>
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-9">
                <div id="root">
                    <Select
                      isMulti
                      name="term"
                      defaultInputValue="202201"
                      options={s_Term}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      //onChange={value=>this.selectTerm(value)}
                    />
                  </div>
                </div>
              <div class="text-right">
                  <button
                      className="m-3 btn btn-sm btn-danger"
                      //onClick={this.removeAllstudents}
                    >
                      Download Report
                  </button>
              </div>
            </div>
            <div className="container">
              <h5><strong>Term 1 Year 2022</strong></h5>
                <h5>Academics</h5>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Subject</th>
                      <th scope="col">Paper 1</th>
                      <th scope="col">Paper 2</th>
                      <th scope="col">Paper 3</th>
                      <th scope="col">Total</th>
                      <th scope="col">Total Percentage</th>
                      <th scope="col">Letter Grade</th>
                      <th scope="col">Class Ranking</th>
                      <th scope="col">Form Ranking</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Math</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Good job!</td>
                      <td>Felix</td>
                    </tr>
                    <tr>
                      <th scope="row">Kiswahili</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>I see improvements!</td>
                      <td>Ruth</td>
                    </tr>
                    <tr>
                      <th scope="row">English</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Keep up the hardwork!</td>
                      <td>Gildah</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                    <tr>
                      <th scope="row">Physics</th>
                      <td>50/60</td>
                      <td>45/60</td>
                      <td>65/80</td>
                      <td>160/200</td>
                      <td>80%</td>
                      <td>A-</td>
                      <td>1/25</td>
                      <td>3/50</td>
                      <td>Well achieved!</td>
                      <td>Kennedy</td>
                    </tr>
                  </tbody>
                </table>

                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Overall</th>
                      <th scope="col">Letter Grade</th>
                      <th scope="col">Class Average</th>
                      <th scope="col">Class Ranking</th>
                      <th scope="col">Form Average</th>
                      <th scope="col">Form Ranking</th>
                      <th scope="col">Previous Term</th>
                    </tr>
                  </thead>
                  <tbody>
                     <tr>
                      <th scope="row"></th>
                      <td>A-</td>
                      <td>C</td>
                      <td>1/25</td>
                      <td>C</td>
                      <td>1/50</td>
                      <td>B+</td>
                    </tr>
                  </tbody>
                </table> 
              <br></br>
            </div>
            <div className="container">
                <h5>Activities</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Event</th>
                      <th scope="col">Achievements</th>
                      <th scope="col">Comments</th>
                      <th scope="col">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                     <tr>
                      <th scope="row">Football Competition</th>
                      <td>Championship</td>
                      <td>The Form 2 prime girls hustled hard and won the final football championship of this school year. Bizan is not only a good team player but also a great leader. Congratulations!</td>
                      <td>Siras</td>
                    </tr>
                    <tr>
                      <th scope="row">ICT Club</th>
                      <td>House Leader</td>
                      <td>Bizan did a great job making the Mirror house website! It looks very professional. I am very proud of you!</td>
                      <td>Edwin</td>
                    </tr>
                  </tbody>
                </table> 
              <br></br>
            </div>
            <div className="container">
                <h5>Performance and Teacher's reports</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Teacher</th>
                      <th scope="col">Title</th>
                      <th scope="col">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                     <tr>
                      <th scope="row">Leah</th>
                      <td>Late to class warning</td>
                      <td>You are a good student and should not be late to class repeatedly. Show respect!</td>
                    </tr>
                    <tr>
                      <th scope="row">Ruth</th>
                      <td>Class Teacher Term Report</td>
                      <td>You are very smart and hardworking. Keep up the hard work!</td>
                    </tr>
                    <tr>
                      <th scope="row">Madam Dorcas</th>
                      <td>Principal Term Report</td>
                      <td>You are a bright student. I expect you to do even better next term!</td>
                    </tr>
                  </tbody>
                </table> 
                <br></br>
            </div>
            <div className="container">
                <h5>Academic Trend</h5>
                  <MDBContainer>
                    <Bar data={data} options={option}/>
                  </MDBContainer>
            </div>
          </div>
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
