import React, { Component } from "react";
import CardComponent from "../studentCard.component";
import Navbar from "../navbar.component";
import '../res/styles.css';

export default class StudentHome extends Component {
    render() {
        return (
            <>
                <div className="navbar">
                    <Navbar/>
                </div>
                <div className="cards">
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                    <CardComponent/>
                </div>
            </> 
        );
    }
}
