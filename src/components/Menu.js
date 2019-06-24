import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import {Navbar, Nav, NavItem} from 'react-bootstrap';
export default class Menubar extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">KhelAmigo</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            {/* <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li> */}
                            <li className="nav-item active">
                                <Link className="nav-link" to="/Personal-profile">Personal Profile</Link>
                            </li>
                            {/* <li className="nav-item">
                                <Link className="nav-link" to="/khelprofile">Khel Profile</Link>
                            </li> */}
                            <li className="nav-item">
                                <Link className="nav-link" to="/LookoutRequest">Lookout Request</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Lookout">Lookout</Link>
                            </li>
                        </ul>
                    </div>
            </div>
            </nav>
        );
    }
}