import React, { Component } from "react";
import CardComponent from "../components/facutyCard.component";
import Navbar from "../components/navbar.component";
import FileView from "../portals/fileView.portal";
import "../res/styles.css";
import axios from "axios";

export default class FacultyHome extends Component {
    constructor (props){
        super(props);

        this.entriesList = this.entriesList.bind(this);
        this.handleViewState = this.handleViewState.bind(this);

        this.state = {
            entries: [],
            isViewing: false,
            file: ''
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
                            this.student_details[JSON.stringify(entry.register_number)] = response.data;                          
                        }).catch((err) => console.log(err));
                    })
                    
                })
                .catch(err => {
                    console.log(err);
                });     
    }

    handleViewState(state, proof) {        
        this.setState({
            file: proof,
            isViewing: state
        });
    }

    entriesList() {
        this.student_details["210701254"] = {department:"CSE",name:"Soniya V",section:"D",year_of_study: 2};
        return this.state.entries.map(currententry => {
            
            var student_details = this.student_details[JSON.stringify(currententry.register_number)];
            if(!student_details){
                return null;
            }        
            return <CardComponent 
                        key={currententry._id}
                        id={currententry._id}
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
                        handleViewState={this.handleViewState}
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
                <FileView
                    filename = { this.state.file }
                    open = { this.state.isViewing }
                    onClose={ () => {
                        this.setState({
                            file: '',
                            isViewing: !this.state.isViewing
                        });
                    }}
                />
            </> 
        );
    }
}