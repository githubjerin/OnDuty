import React, { Component } from "react";
import CardComponent from "../components/facutyCard.component";
import Navbar from "../components/navbar.component";
import "../res/styles.css";
import axios from "axios";

export default class FacultyHome extends Component {
    constructor (props){
        super(props);

        this.entriesList = this.entriesList.bind(this);

        this.state = {
            entries: []
        };

        this.student_details = {};
    }

    async componentDidMount() {
        await axios.get("http://localhost:2003/od-approval/", { withCredentials: true })
                .then(res => {
                    this.setState({
                        entries: res.data
                    });
                    res.data.forEach(async (entry) => {
                        await axios.post('http://localhost:2003/student/get-details', 
                                { register_number: entry.register_number },
                                { withCredentials: true }
                        ).then((response) => { 
                            this.student_details[entry.register_number] = response.data;                          
                        }).catch((err) => console.log(err));
                    })
                    
                })
                .catch(err => {
                    console.log(err);
                });     
    }

    entriesList() {
        return this.state.entries.map(currententry => {
            var student_details = this.student_details[JSON.stringify(currententry.register_number)];
            if(!student_details){
                return null;
            }         
            return <CardComponent 
                        key={currententry._id}
                        register_number={currententry.register_number}
                        name={student_details.name}
                        year_of_study={student_details.year_of_study}
                        department={student_details.department}
                        section={student_details.section}
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
            </> 
        );
    }
}