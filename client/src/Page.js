import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { Grid } from 'react-bootstrap';
import Contents from './Contents.js';

// function NavBar() {
//   return (
//     <nav class="navbar navbar-inverse navbar-fixed-bottom">
//       <NavLink exact to="/">Home</NavLink>
//       {' | '}
//       <NavLink to="/issues">Issue List</NavLink>
//       {' | '}
//       <NavLink to="/report">Report</NavLink>
//     </nav>
//   );
// }

function Footer() {
  return (
    <small>
      <hr />
      <p className="text-center">
        Full source code available at this
        {' '}
        <a href="https://github.com/syuan00/my-app">
          GitHub repository
        </a>
      </p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      {/* <Grid fluid> */}
        <Contents/>
      {/* </Grid> */}
      <Footer />
    </div>
  );
}