import React, { Component } from "react";
import CardComponent from "../components/studentCard.component";
import Navbar from "../components/navbar.component";
import OdCreation from "../components/odCreation.component";
import '../res/styles.css';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default class StudentHome extends Component {
    constructor (props){
        super(props);

        this.entriesList = this.entriesList.bind(this);

        this.state = {
            entries: [],
            isApplying: false
        };
    }

    async componentDidMount() {
        await axios.get("http://localhost:2003/od-application/", { withCredentials: true })
                .then(res => {
                    this.setState({
                        entries: res.data
                    });                    
                })
                .catch(err => {
                    console.log(err);
                });     
    }

    entriesList() {
        return this.state.entries.map(currententry => {       
            return <CardComponent 
                        key={currententry._id}
                        id={currententry._id}
                        event={currententry.event}
                        organization={currententry.organization}
                        outcome={currententry.outcome}
                        start_date={currententry.start_date}
                        end_date={currententry.end_date}
                        status={currententry.status}
                        proof={currententry.proof}
                    />;
        });
    }

    render() {
        return (
            <>
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="cards">
                    {this.entriesList()}
                </div>
                <div className="empty-area"/>
                <div className="floating-btn">
                    <Fab 
                        size="large" 
                        color="secondary" 
                        aria-label="add"
                        onClick={() => {
                            this.setState({
                                isApplying: true
                            });
                        }}
                        >
                        <FontAwesomeIcon icon={faPlus} style={{color: "#ffffff"}} size="xl" />
                    </Fab>
                </div>
                <OdCreation 
                    open={ this.state.isApplying } 
                    onSubmit={ () => { 
                        this.setState({
                            isApplying: false
                        });
                    }
                }/>
            </> 
        );
    }
}
