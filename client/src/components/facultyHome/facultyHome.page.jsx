import React, { Component } from "react";
import './facultyHome.page.css';
import CardComponent from "../cardComponent";

export default class FacultyHome extends Component {
    render() {
        return (
            <div>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
                <CardComponent/>
            </div> 
        );
    }
}

