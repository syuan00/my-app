// import 'babel-polyfill';
// import 'whatwg-fetch';
import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

// import React,{useState} from "react";
// import {GoogleLogout,GoogleLogin} from 'react-google-login'
// import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
// import {
//   Navbar, Nav, NavItem, NavDropdown, Tooltip, OverlayTrigger,
// } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import "./App.css";

import Page from './Page.js';
function App() {
    return (
        <Router>
            <Page />
        </Router>
    );
}

export default App;