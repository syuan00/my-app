import React from 'react';
import {
  Navbar, Nav, NavItem, 
  // NavDropdown, MenuItem, Glyphicon,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { GoogleLogout,GoogleLogin } from 'react-google-login'

import Contents from './Contents.js';
import IssueAddNavItem from './IssueAddNavItem.js';

function NavBar(props) {

  // google login helper function
  const responseGoogle = (response) => {
    console.log(response);
    const curuser = response.googleId;
    props.setCurUser(curuser);
  }

  // google logout helper function
  const logout = () => {
    console.log("logged out!!!!")
    props.setCurUser("")
  }

  return (
    <Navbar fluid>
      <Navbar.Header>
        <Navbar.Brand style={{ color: "black" }}><b>PageBox</b></Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to="/issues">
          <NavItem>Issue List</NavItem>
        </LinkContainer>
        <LinkContainer to="/report">
          <NavItem>Report</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <IssueAddNavItem user_id={props.user_id}/>
        {/* 理论上应该能点开一个下拉页面，目前没反应，但不重要，这个部分之后也用不到
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown> */}
        <GoogleLogin
          clientId="766323342011-sji3911u7g14ev4hj9hj6emdlgac5pvi.apps.googleusercontent.com"
          buttonText="Login"
          style = {{border : 'none', outline :'none'}}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
        <GoogleLogout
          clientId="766323342011-sji3911u7g14ev4hj9hj6emdlgac5pvi.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
      </Nav>
    </Navbar>
  );
}

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

export default class Page extends React.Component{
  constructor() {
    super();
    this.state = { user_id: "" };
    this.setCurUser = this.setCurUser.bind(this);
  }

  async setCurUser(curUser) {
    this.setState({ user_id: curUser })
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"+this.state.user_id)
  }

  render() {
    return (
      <div>
        <NavBar user_id={this.state.user_id} setCurUser={this.setCurUser}/>
        <Grid fluid>
          <Contents user_id={this.state.user_id}/>
        </Grid>
        <Footer />
      </div>
    );
  }
}
