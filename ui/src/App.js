// import 'babel-polyfill';
// import 'whatwg-fetch';
import React from 'react';
// import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import "./App.css";

import Page from './Page.js';

function App() {
    return (
        <Router>
            <Page />
            <div>
                this is App
            </div>
        </Router>
    );
}

export default App;