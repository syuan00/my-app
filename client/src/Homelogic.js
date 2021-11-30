import React,{useState} from "react";
import {GoogleLogout,GoogleLogin} from 'react-google-login'
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { Link, NavLink, withRouter } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// import "./App.css";
import graphQLFetch from './graphQLFetch.js';
import IssuePanel from './IssuePanel.js';

/**
 * @author Hu Yue
 * @description all the modals used in homepage and some actions, including the login modal, the signup modal, the addLink modal
 */
class ModalCollection extends React.Component{
  constructor(){
    super()
    this.handleAddLink = this.handleAddLink.bind(this);
  }

  handleAddLink(e){
    e.preventDefault();
    const issue = {
      link: document.querySelector(".url").value
    }
    this.props.addNewLink(issue);
    document.querySelector(".url").value = ""
  }
  render(){
    return(
      <div>
        <div class="modal fade" id="myLoginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Login</h4>
                </div>

                <div class="modal-body">
                  <label for="uname"><b>Username</b></label>
                  <input type="text" placeholder="Enter Username" name="uname" required/>
                  <br/>
                  <label for="psw"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="psw" required/>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">cancel</button>
                    <button type="button" class="btn btn-primary">Login</button>
                </div>
            </div> 
          </div> 
          </div>

          <div class="modal fade" id="mySignUpModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">

                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title" id="myModalLabel">Create Your Account</h4>
                </div>

                <div class="modal-body">
                  <label for="uname"><b>Username</b></label>
                  <input type="text" placeholder="Enter Username" name="uname" required/>
                  <br/>
                  <label for="psw"><b>Password</b></label>
                  <input type="password" placeholder="Enter Password" name="psw" required/>
                  <br/>
                  <label for="psw"><b>Confirm your password</b></label>
                  <input type="password" placeholder="Enter Password" name="psw"required/>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">cancel</button>
                    <button type="button" class="btn btn-primary">Confirm</button>
                </div>
            </div> 
          </div> 
          </div>

          <div class="modal fade" id="myAddLinkModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" 
                      aria-hidden="true">×
                  </button>
                  <h4 class="modal-title" id="myModalLabel">
                    Please add your link
                  </h4>
                </div>
                <div class="modal-body">
                        <b>URL  </b>
                        <input type="url" placeholder="Enter URL" name="url" className="url" required/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" 
                      data-dismiss="modal">cancel
                  </button>
                  <button type="button" class="btn btn-primary" onClick={this.handleAddLink} data-dismiss="modal">
                    confirm
                  </button>
                </div>
              </div> 
            </div> 
          </div> 
      </div>
    )
  }
}

/**
 * @author Hu Yue
 * @description define the page head for the homepage, including the app_icon, the search_bar, 3 button at the right side for login, signup and addlink
 */
function PageHead (props){
    const [user, setUser] = useState();
    const responseGoogle = (response) => {
      console.log(response)
      setUser(response.googleId)
      const curuser = response.googleId
      props.setCurUser(curuser)
    }
    const logout = () => {
      console.log("logged out!!!!")
      setUser("")
      props.setCurUser("")
    }
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" style={{ color: "black" }}><b>PageBox</b></a>
          </div>

          <ul className="nav navbar-nav navbar-right">
            <li><a className = "btn btn-link" href = '#' role = "button"  data-toggle = "modal" data-target = "#myAddLinkModal"><span className="glyphicon glyphicon-link"></span> Add Link</a></li>
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
              >
              </GoogleLogout>
          </ul>

        </div>
      </nav>
    )
  
}

/**
 * @author Hu Yue
 * @description define the sidebar for the homepage, including different links and tags
 */
class SideBar extends React.Component {
  constructor(props){
    super(props)
    this.handleHome = this.handleHome.bind(this)
    this.handleMark = this.handleMark.bind(this)
    this.handleRead = this.handleRead.bind(this)
    this.handleFolder = this.handleFolder.bind(this)
  }
  handleMark(e) {
    e.preventDefault();
    this.props.setCategory("mark")
  }

  handleHome(e) {
    e.preventDefault();
    this.props.setCategory("home")
  }

  handleRead(e) {
    e.preventDefault();
    this.props.setCategory("read")
  }

  handleFolder(e) {
    e.preventDefault();
    this.props.setCategory("folder")
  }

  render() {
    return (
      <div class="w3-sidebar w3-light-grey w3-bar-block" style={{ width: "15%"}}>
        <a href="javascript:void(0)" class="w3-bar-item w3-button" onClick = {this.handleHome}><span className="glyphicon glyphicon-home"></span> Home</a>
        <a href="javascript:void(0)" class="w3-bar-item w3-button" onClick = {this.handleMark}><span className="glyphicon glyphicon-bookmark"></span> Marks</a>
        <a href="javascript:void(0)" class="w3-bar-item w3-button" onClick = {this.handleRead}><span className="glyphicon glyphicon-eye-open"></span> Unread{" "}</a>
        <a href="javascript:void(0)" class="w3-bar-item w3-button" onClick = {this.handleFolder}><span className="glyphicon glyphicon-folder-open"></span> My Folder </a>
        <br/>
        <div class="w3-container w3-leftbar">
          <p class="w3-large w3-serif"><i>{"  "}Explore by tags</i></p>
        </div>
        <a href="#" class="w3-bar-item w3-button" style={{ marginLeft: "1em" }}> #Pets</a>
        <a href="#" class="w3-bar-item w3-button" style={{ marginLeft: "1em" }}> #Foods</a>
      </div>
    
    );
  }
}

// function ShowPage(props) {
//   const entity = props.entity;
//   const tags = entity.tags ? entity.tags.map(tag => ('#'+tag)).join(' ') : "";
//   return (
//     <div id="ShowPage" class="row">
//       <div class="col-sm-12">
//         <h1>{entity.title}</h1>
//         <p>{entity.link} · {entity.createdTime.toDateString()}</p>
//         <p>{entity.foler} · {tags}</p>
//         <div dangerouslySetInnerHTML={{ __html: entity.text }}></div>
//       </div>
//     </div>
//   );
// }

// function ShowEntity(props) {
//   const entity = props.entity;
//   return (
//     <div id="ShowEntity">
//       <div class="row">
//         <div class="col-sm-6">
//           <ShowPage entity={entity}/> 
//         </div>
//         <div class="col-sm-6">
//           <ShowNoteW entity={entity}/> 
//         </div>
//       </div>
//     </div>
//   );
// }

/**
 * @author Hu Yue
 * @description define the main content of the homepage, including the 
 */
 function MainContent(props){
  const IssuePanels = props.issues.map(issue =>  <IssuePanel key={issue.id} issue={issue} changeCategoryOfOnePage = {props.changeCategoryOfOnePage}/>)
  return (
    <div>
      <div style={{ marginLeft: "18%" ,marginTop:"75px"}}>
        <div>
          {IssuePanels}
        </div>
      </div>
    </div>
  )
}

/**
* @author Hu Yue
* @description whole logic for the homepage, including interating with the backend
*/
export default class Homelogic extends React.Component{

 constructor(){
   super()
   this.state = {issues: [], category : "home", user_id:""}
   this.addNewLink = this.addNewLink.bind(this)
   this.setCurUser = this.setCurUser.bind(this)
   this.setCategory = this.setCategory.bind(this)
   this.changeCategoryOfOnePage = this.changeCategoryOfOnePage.bind(this)
 }

 componentDidMount(){
   const issue = {
     category: this.state.category,
     user_id: this.state.user_id
   }
   this.loadData(issue);
 }

 async loadData(issue) {
   
   const query = `query($issue: IssueInputs!) {
     issueList(issue: $issue) {
       user_id id title summary link noteText
     }
   }`;
   const data = await graphQLFetch(query,{issue});
   if (data) {
     this.setState({ issues: data.issueList });
   }
 
 }

 //add link
 async addNewLink(issue){
   issue.user_id = this.state.user_id;
   const query = `mutation issueAdd($issue: IssueInputs!) {
     issueAdd(issue: $issue) {
       id
     }
   }`;
   const data = await graphQLFetch(query, {issue});
   issue.category = "home"
   if (data) {
     this.loadData(issue);
   }
 }

 async setCategory(mycategory){
   console.log("clientf_origin:" + mycategory)
   this.setState({ category:mycategory });
   const issue = {
     category: mycategory,
     user_id: this.state.user_id
   }
   this.loadData(issue)
 }

 async setCurUser(curUser){
   
   this.setState({user_id:curUser})
   const issue = {
     category: this.state.category,
     user_id: curUser
   }
   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1"+this.state.user_id)
   this.loadData(issue)
 }

 async changeCategoryOfOnePage(issue){
   issue.user_id = this.state.user_id;
   const query = `mutation issueChangeCategory($issue: IssueInputs!) {
     issueChangeCategory(issue: $issue) {
       id
     }
   }`;
   const data = await graphQLFetch(query, {issue});
   issue.category = this.state.category;
   if (data) {
     this.loadData(issue);
   }
 }

 render(){
   return (
     <div>
       <ModalCollection addNewLink = {this.addNewLink}/>
       <PageHead setCurUser = {this.setCurUser}/>
       <SideBar setCategory = {this.setCategory}/>
       <MainContent issues = {this.state.issues} changeCategoryOfOnePage = {this.changeCategoryOfOnePage}/>
     </div> 
   );
 }
}