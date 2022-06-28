import React, { Component } from "react";
import teacherDataService from "../services/teacher.service";
import { Link } from "react-router-dom";
import logo from './wiser.jpg';
import "./authentication.css";


export default class teacherLogin extends Component {
    constructor(props) {
      super(props);
      this.registerName = this.registerName.bind(this);
      this.registerPswd = this.registerPswd.bind(this);
      this.saveTeacher = this.saveTeacher.bind(this);
      this.loginName = this.loginName.bind(this);
      this.loginPswd = this.loginPswd.bind(this);
      this.loginTeacher = this.loginTeacher.bind(this);
  
      this.state = {
          id: null,
          username: "",
          password: "",
          submitted: false
      };
    }

  
    registerName(e) {
        this.setState({
            username: e.target.value
        }); 
    }
  
    registerPswd(e) {
        this.setState({
            password: e.target.value
        });
    }
  
    saveTeacher() {
        var data = {
          username: this.state.username,
          password: this.state.password
        };
  
        teacherDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            username: response.data.username,
            password: response.data.password,

            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    loginName(e) {
        this.setState({
            password: e.target.value
        });
    }

    loginPswd(e) {
        this.setState({
            password: e.target.value
        });
    }
  
    loginTeacher() {
        var data = {
          username: this.state.username,
          password: this.state.password,
        };
  
        teacherDataService.create(data)
        .then(response => {
          this.setState({
            id: response.data.id,
            username: response.data.username,
            password: response.data.password,

            submitted: true
          });
          console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }
  
    /***  <Link to={"/students"} className="badge badge-warning">
    Continue
    </Link> */
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h2>Kalibu, Teacher!</h2>
                        <p>Education is life.</p>
                        <Link
                            to={"/students/" + currentstudent.id}
                            className="btn btn-outline-primary"
                        >
                            Continue
                        </Link>
                    </div>
                ) : (
                <div>
                    <div class="image-container">
                        <img src={logo} alt="logo" width="280" height="280" align='center'/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            required
                            Value={this.state.username}
                            onChange={this.registerName}
                            name="username"
                        />
                    </div>
        
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            required
                            value={this.state.password}
                            onChange={this.registerPswd}
                            name="password"
                        />
                    </div>
        
                    <button onClick={this.saveTeacher} className="btn btn-success">
                        Login
                    </button>
                </div>
                )}
            </div>
            );
        }
    }
    
/*** 
function App(){
    const[usernameReg, setUsernameReg] = useState("")
    const[passwordReg, setPasswordReg] = useState("")
    
    return(
        <div className="App">
            <div className="registration">
                <h1>Register</h1>
                <label>Username</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setUsernameReg(e.target.value);
                    }} 
                />
                <label>Password</label>
                <input 
                    type="text"
                    onChange={(e) => {
                        setPasswordReg(e.target.value);
                    }} 
                />
                <button>Register</button>
            </div>
            <div className="login">
                <h1>Login</h1>
                <input type="username" placeholder="Username..." />
                <input type="password" placeholder="Password..." />
                <button>Login</button>
            </div>
        </div>
    );
}
***/