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
import IssueLinkAdd from "./IssueLinkAdd.js";
var prevUser = "";
var preSavedCategory = "home"


function Login(props){
  const [user, setUser] = useState();
  const responseGoogle = (response) => {
    console.log(response)
    setUser(response.googleId)
    const curuser = response.googleId
    prevUser = curuser
    props.getMsg(curuser)
  }
  const logout = () => {
    console.log("logged out!!!!")
    setUser("")
    props.getMsg("")
    prevUser = ""
  }
  return (
    <>
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
    </>
  )
}
/**
 * @author Hu Yue
 * @description define the page head for the homepage, including the app_icon, the search_bar, 3 button at the right side for login, signup and addlink
 */
class PageHead extends React.Component{
    constructor(props){
      super(props)
      this.handleGetMsg = this.handleGetMsg.bind(this)
      // this.handleAddLink = this.handleAddLink.bind(this)
      this.state = {user:prevUser}
    }
    handleGetMsg = (value) => {
      // console.log(value)
      this.props.setCurUser(value)
      this.setState({user:value})
    }
  
   
    render(){
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" style={{ color: "black" }}><b>PageBox</b></a>
          </div>

          <ul className="nav navbar-nav navbar-right">
            <IssueLinkAdd user_id = {this.state.user}/>
            <Login getMsg ={this.handleGetMsg}/>
          </ul>

        </div>
      </nav>
    )
            }
  
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
  const IssuePanels = props.issues.map(issue =>  <IssuePanel key={issue.id} issue={issue} changeCategoryOfOnePage = {props.changeCategoryOfOnePage} deleteOnePage = {props.deleteOnePage} keepInCurCategory = {props.keepInCurCategory}/>)
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
   this.state = {issues: [], category : preSavedCategory, user_id:"",isLoggoutTriggered:false}
   this.setCurUser = this.setCurUser.bind(this)
   this.setCategory = this.setCategory.bind(this)
   this.deleteOnePage = this.deleteOnePage.bind(this)
   this.changeCategoryOfOnePage = this.changeCategoryOfOnePage.bind(this)
   this.keepInCurCategory = this.keepInCurCategory.bind(this)
 }

 componentDidMount(){
   const issue = {
     category: this.state.category,
     user_id: this.state.user_id
   }
   this.loadData(issue);
 }


 async keepInCurCategory(issue){
  //  console.log("cur userid from state:" + this.state.user_id);
  //  console.log("cur userid from issue:" + issue.user_id)
  //  console.log("original status from state:" + this.state.category);
  //  console.log("excepted category from curpage:" + issue.category);
  //  if(this.state.category != issue.category){
    this.setState({category:issue.category, user_id:issue.user_id})
    const newIssue = {
      user_id: issue.user_id,
      category : issue.category
    }
    // console.log(newIssue);
    // console.log("cur userifd from state:" + this.state.user_id);
    this.loadData(newIssue)

 }
 async loadData(issue) {
  //  console.log("from load data : " + issue.user_id)
  //  console.log("from load data category:" + issue.category);
   const query = `query($issue: IssueInputs!) {
     issueList(issue: $issue) {
       user_id id title summary link noteText category
     }
   }`;
   const data = await graphQLFetch(query,{issue});
   if (data) {
     this.setState({ issues: data.issueList });
    //  console.log("getrefreash page: userid" + this.state.user_id);
    //  console.log("getrefreash page: category" + this.state.category);
   }
 
 }


 async setCategory(mycategory){
  //  console.log("clientf_origin:" + mycategory)
   this.setState({ category:mycategory });
   preSavedCategory = mycategory;
   const issue = {
     category: mycategory,
     user_id: this.state.user_id
   }
   this.loadData(issue)
 }

 async setCurUser(curUser){
   
   this.setState({user_id:curUser})
   if(curUser.length == 0) this.setState({isLoggoutTriggered:true})
   const issue = {
     category: this.state.category,
     user_id: curUser,
     isLoggoutTriggered:this.state.isLoggoutTriggered
   }
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

 async deleteOnePage(issue){
   const query = `mutation issueDelete($issue: IssueInputs!) {
    issueDelete(issue: $issue) {
      id
    }
  }`;
  // console.log("delete issue.category:" + issue.category);
  // console.log("origianl category:" + this.state.category);
  const data = await graphQLFetch(query, {issue});
  if (data) {
    this.loadData(issue);
  }

 }

 render(){
   return (
     <div>
       
       <PageHead setCurUser = {this.setCurUser}/>
       <SideBar setCategory = {this.setCategory}/>
       <MainContent issues = {this.state.issues} changeCategoryOfOnePage = {this.changeCategoryOfOnePage} deleteOnePage = {this.deleteOnePage} keepInCurCategory = {this.keepInCurCategory}/>
     </div> 
   );
 }
}