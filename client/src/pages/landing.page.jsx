import React, { Component } from "react";
import '../res/styles.css';
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
        this.setLoggedInStatus =this.setLoggedInStatus.bind(this);
        this.setDataLocale =this.setDataLocale.bind(this);

        this.state = {
            username: null,
            password: null,
            user: null
        };
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
        this.setState({
            user: params.target.value
        });
    }

    setDataLocale(isLoggedIn, user) {
        sessionStorage.setItem('isLoggedIn', isLoggedIn);
        sessionStorage.setItem('user', user);
    }

    setLoggedInStatus(data) {
        if (!data || data === undefined) {
            this.setDataLocale(false, 'none');
        } else {
            if (this.state.user === 'faculty') {
                const { faculty_code } = data;
                if (!faculty_code) {
                    this.setDataLocale(false, 'none');
                } else {
                    this.setDataLocale(true, 'faculty');
                }

            } else if (this.state.user === 'student') {
                const { register_number } = data;
                if (!register_number) {
                    this.setDataLocale(false, 'none');
                } else {
                    this.setDataLocale(true, 'student');
                }

            } else {
                this.setDataLocale(false, 'none');
            }
        }
    }

    async onSubmit(params) {
        params.preventDefault();

        const body = {
            register_number: this.state.username,
            faculty_code: this.state.username,
            password: this.state.password
        };

        try {

            if (this.state.user === "student") {
                await axios.post('http://localhost:2003/student/login', body, { withCredentials: true })
                                .then((res) => this.setLoggedInStatus(res.data));
            } else {
                await axios.post('http://localhost:2003/faculty/login', body, { withCredentials: true })
                                .then((res) => this.setLoggedInStatus(res.data));
            }
            this.setState({
                username: null,
                password: null,
                user: null
            });

        } catch (AxiosError) {
            console.log(AxiosError);
            this.setDataLocale(false, 'none');
        }
        document.getElementById("login-form").reset();

        if (sessionStorage.getItem('user') === 'faculty') {
            if (sessionStorage.getItem('isLoggedIn') === 'true') {
                window.location = '/faculty-home';
            } 
        } else if (sessionStorage.getItem('user') === 'student') {
            if (sessionStorage.getItem('isLoggedIn') === 'true') {
                window.location = '/student-home';
            } 
        }
    }

    render() {
        return (
            <div className="landing-page">
                <div>
                    <img className='watermark' src={watermark} alt='watermark'/>
                </div>
                <div className='content'>
                    <div className="title">
                        <h1>REC On-Duty Application Portal</h1>
                    </div>
                    <div className="cover">
                        <h2>Welcome</h2>

                        <form onSubmit={ this.onSubmit } id="login-form">

                            <div className="form-group">
                                <div className="inputbox">
                                    <i>
                                        <FontAwesomeIcon icon={faUser} style={{color: "#532762",}} />
                                    </i>
                                    <input 
                                        type="text" 
                                        required
                                        onInput={ this.onInputUsername } 
                                        />
                                    <label>Faculty Code | Register Number</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="inputbox">
                                    <i>
                                        <FontAwesomeIcon icon={faLock} style={{color: "#532762"}} />
                                    </i>
                                    <input 
                                        type="password" 
                                        required 
                                        onInput={ this.onInputPassword }/>
                                    <label>Password</label>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="userSelect">
                                    <h2>I am a</h2>
                                    <input 
                                        type="radio" 
                                        id="faculty" 
                                        name="userselect" 
                                        value="faculty"
                                        onInput={ this.onInputUser }
                                        />
                                    <label>Faculty    </label> 
                                    <input 
                                        type="radio" 
                                        id="student" 
                                        name="userselect" 
                                        value="student"
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

