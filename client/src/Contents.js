import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// import IssueReport from './IssueReport.js';
import PageNote from './PageNote.js';
import Homelogic from './Homelogic.js';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/issues" />
      <Route path="/issues" component={Homelogic} />
      <Route path="/page-note/:id" component={PageNote} />
      {/* <Route path="/report" component={IssueReport} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}