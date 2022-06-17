import React, { Component } from "react";
import teacherDataService from "../services/teacher.service";
import { Link } from "react-router-dom";

export default class teacherLogin extends Component {
    constructor(props) {
      super(props);
      this.registerName = this.registerName.bind(this);
      this.registerPswd = this.registerPswd.bind(this);
      this.saveTeacher = this.saveTeacher.bind(this);
      this.loginName = this.updateGraduated.bind(this);
      this.loginPswd = this.updatestudent.bind(this);
  
      this.state = {
          id: null,
          username: "",
          password: ""
      };
    }

  
    registerName(e) {
        this.setState({
            name: e.target.value
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
  
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                <div>
                    <h4>You registered successfully!</h4>
                    <button className="btn btn-success" onClick={this.newstudent}>
                    Login
                    </button>
                </div>
                ) : (
                <div>
                    <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        required
                        value={this.state.username}
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
                            name="form"
                        />
                    </div>
        
                    <button onClick={this.savestudent} className="btn btn-success">
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