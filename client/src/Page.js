import React from 'react';
import { NavLink } from 'react-router-dom';

import Contents from './Contents.js';

function NavBar() {
  return (
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
      <NavLink exact to="/">Home</NavLink>
      {' | '}
      <NavLink to="/issues">Issue List</NavLink>
      {' | '}
      <NavLink to="/report">Report</NavLink>
    </nav>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}