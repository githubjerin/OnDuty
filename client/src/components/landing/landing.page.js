import React, { Component } from "react";
import './landing.page.css';
import watermark from '../res/watermark.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.onInputUsername = this.onInputUsername.bind(this);
        this.onInputPassword = this.onInputPassword.bind(this);
        this.onInputUser = this.onInputUser.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getToken =this.getToken.bind(this);

        this.state = {
            username: null,
            password: null
        };
        this.user = "";
    }

    onInputUsername(params) {
        this.setState({
            username: params.target.value
        });
    }

    onInputPassword(params) {
        this.setState({
            password: params.target.value
        });
    }

    onInputUser(params) {
        this.user = params.target.value;
    }

    getToken(params) {
        const token = params.data.token;
        console.log(token);
    }

    async onSubmit(params) {
        params.preventDefault();

        const body = {
            register_number: this.state.username,
            faculty_code: this.state.username,
            password: this.state.password
        } 

        try {

            if (this.user === "STUDENT") {
                await axios.post('http://localhost:2003/student/login', body)
                                .then(res => this.getToken(res));
            } else {
                await axios.post('http://localhost:2003/faculty/login', body)
                                .then(res => this.getToken(res));
            } 
            this.setState({
                username: null,
                password: null
            });

        } catch (AxiosError) {
            if (AxiosError.response.status === 401) {
                alert(AxiosError.response.data.error);
            } else {
                console.log(AxiosError);
            }
        }

        document.getElementById("login-form").reset();
    }

    render() {
        return (
            <div>
                <div class="background">
                    <img class='watermark' src={watermark} alt='watermark'/>
                </div>
                <div class='content'>
                    <div class="title">
                        <h1>REC On-Duty Application Portal</h1>
                    </div>
                    <div class="cover">
                        <h2>Welcome</h2>

                        <form onSubmit={ this.onSubmit } id="login-form">

                            <div className="form-group">
                                <div class="inputbox">
                                    <icon>
                                        <FontAwesomeIcon icon={faUser} style={{color: "#532762",}} />
                                    </icon>
                                    <input 
                                        type="number" 
                                        required
                                        onInput={ this.onInputUsername } 
                                        />
                                    <label for="">Faculty Code | Register Number</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div class="inputbox">
                                    <icon>
                                        <FontAwesomeIcon icon={faLock} style={{color: "#532762"}} />
                                    </icon>
                                    <input 
                                        type="password" 
                                        required 
                                        onInput={ this.onInputPassword }/>
                                    <label for="">Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div class="userSelect">
                                    <h2>I am a</h2>
                                    <input 
                                        type="radio" 
                                        id="faculty" 
                                        name="userselect" 
                                        value="FACULTY"
                                        onInput={ this.onInputUser }
                                        />
                                    <label>Faculty    </label> 
                                    <input 
                                        type="radio" 
                                        id="student" 
                                        name="userselect" 
                                        value="STUDENT"
                                        onInput={ this.onInputUser }
                                        />
                                    <label>Student</label>
                                    <br/>
                                    <p> <br></br> </p>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="login-btn">
                                    <input type="submit" value="Login"/>
                                </div>
                            </div>
                        </form>

                        <br></br>
                    </div>
                </div>
            </div> 
        );
    }
}

