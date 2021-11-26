import React,{useState} from "react";
import {GoogleLogout,GoogleLogin} from 'react-google-login'
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "./App.css";

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');
function jsonDateReviver(key, value) {
  if (dateRegex.test(value)) return new Date(value);
  return value;
}


const initialEntities = [];

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
 * @description used to fetch data from the backend
 */
async function graphQLFetch(query, variables = {}) {
  console.log("clientft:" + variables)
  try {
    const response = await fetch('http://localhost:5000/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ query, variables}) 
    });
    console.log("client body:" + JSON.stringify({ query, variables}) )
    const body = await response.text();
    
    const result = JSON.parse(body, jsonDateReviver);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code == 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n ');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}: ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
  }
}
/**
 * @author Hu Yue
 * @description whole logic for the homepage, including interating with the backend
 */
class Homelogic extends React.Component{

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
        user_id title summary link noteText
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
    if (data) {
      this.loadData(this.state.category);
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
/**
 * @author Hu Yue
 * @description the helper class for class MainContent, used to show data in the left summary modal 
 */
class IssuePanel extends React.Component {
  constructor(){
    super()
    this.handleHome = this.handleHome.bind(this)
    this.handleMark = this.handleMark.bind(this)
    this.handleRead = this.handleRead.bind(this)
    this.handleFolder = this.handleFolder.bind(this)
  }

  handleHome(e){
    e.preventDefault();
    const issue = this.props.issue;
    const updatedissue = {
      category: "home",
      link: issue.link
    }
    this.props.changeCategoryOfOnePage(updatedissue);
  }

  handleMark(e){
    e.preventDefault();
    const issue = this.props.issue;
    const updatedissue = {
      category: "mark",
      link: issue.link
    }
    this.props.changeCategoryOfOnePage(updatedissue);
  }

  handleRead(e){
    e.preventDefault();
    const issue = this.props.issue;
    const updatedissue = {
      category: "read",
      link: issue.link
    }
    this.props.changeCategoryOfOnePage(updatedissue);
  }

  handleFolder(e){
    e.preventDefault();
    const issue = this.props.issue;
    const updatedissue = {
      category: "folder",
      link: issue.link
    }
    this.props.changeCategoryOfOnePage(updatedissue);
  }

  render() {
    const issue = this.props.issue;
    var displaymode = issue.noteText == null ? 'none' : 'block';
    return (
      <div class="row">
       
        <div class="col-xs-12 col-sm-5">
          <div class="panel panel-default">

            <div class="panel-heading">
              <h3 class="panel-title">
                <a href={issue.link}><span className="glyphicon glyphicon-link"></span></a>
                {issue.title}
                <a className = "btn btn-link" href = '#' role = "button" data-toggle="modal" data-target="#myEditModal"  style={{ marginLeft: "1em" }}>  <span class="glyphicon glyphicon-pencil"></span> </a>
              </h3>
            </div>

            <div class="panel-body">
              {issue.summary}
            </div>

            <div class="panel-footer">
             <div  class="btn-group btn-group-xs">
                <button class = 'btn' onClick = {this.handleHome}><span className="glyphicon glyphicon-home"></span></button>
                <button class = 'btn' onClick = {this.handleMark}><span className="glyphicon glyphicon-bookmark"></span></button>
                <button class = 'btn' onClick = {this.handleRead}><span className="glyphicon glyphicon-eye-open"></span></button>
                <button class = 'btn' onClick = {this.handleFolder}><span className="glyphicon glyphicon-folder-open"></span></button>
              </div>
          </div>

          </div>
        </div>

        <div class="col-xs-12 col-sm-5">
          <div class="panel panel-default" style={{ display: displaymode }}>
            <div class="panel-heading">
              Notes
            </div>
            <div class="panel-body">
              {issue.noteText}
            </div>
          </div>
        </div>
        <br />


        <div class="modal fade" id="myEditModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal" 
                      aria-hidden="true">×
                  </button>
                  <h4 class="modal-title" id="myModalLabel">
                    Edit bookmark
                  </h4>
                </div>
                <div class="modal-body">
                      <label for="title"><b>title</b></label>
                      <div contentEditable="true"  type="myinput" placeholder="Enter title" name="title">{issue.title}</div>
                      <br/>
                      <label for="link"><b>link</b></label>
                      <div contentEditable="true"  type="myinput" placeholder="Enter link" name="link" required >{issue.link} </div>
                      <br/>
                      <label for="summary"><b>summary</b></label>
                      <div contentEditable="true"  type="summary" placeholder="Enter summary" name="summary" required> {issue.summary}</div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary">
                    Save Changes
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

function NavBar() {
  return (
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
      <div class="container-fluid">
        <div class="navbar-header">
          <Link class="navbar-brand" to="/home">PageBox UI</Link>
        </div>
        <ul class="nav navbar-nav">
          <li class="active"><Link className="Nav__link" to="/home">Home</Link></li>
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="">Page1
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><Link className="Nav__link" to="/e1-page-note">Page+Note</Link></li>
              <li><Link className="Nav__link" to="/e1-page">Page</Link></li>
              <li><Link className="Nav__link" to="/e1-note">Note</Link></li>
            </ul>
          </li>
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" href="">Page2
            <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><Link className="Nav__link" to="/e2-page-note">Page+Note</Link></li>
              <li><Link className="Nav__link" to="/e2-page">Page</Link></li>
              <li><Link className="Nav__link" to="/e2-note">Note</Link></li>
            </ul>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="">* This navigation bar is used for the convenience of displaying all the UI.</a></li>
        </ul>  
      </div>
    </nav>
  )
}

class EntityHead extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" style={{ color: "black" }}><b>PageBox</b></a>
          </div>

          <ul className="nav navbar-nav navbar-right">
            <div  class="btn-group btn-group-xs">
            </div>
            <div class="btn-group">
              <div class="btn-group">
                <button type="button" class="btn" data-toggle="dropdown">
                Page+Note <span class="caret"></span></button>
                <ul class="dropdown-menu" role="menu">
                  <li><a href="#">Page</a></li>
                  <li><a href="#">Note</a></li>
                </ul>
              </div>
              <button type="button" class="btn"><span className="glyphicon glyphicon-bookmark"></span></button>
              <button type="button" class="btn"><span className="glyphicon glyphicon-eye-open"></span></button>
              <button type="button" class="btn"><span className="glyphicon glyphicon-folder-open"></span></button>
            </div>
            <li><a href="#"><span className="glyphicon glyphicon-link"></span> Add Link</a></li>
            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

function ShowPage(props) {
  const entity = props.entity;
  const tags = entity.tags ? entity.tags.map(tag => ('#'+tag)).join(' ') : "";
  return (
    <div id="ShowPage" class="row">
      <div class="col-sm-12">
        <h1>{entity.title}</h1>
        <p>{entity.link} · {entity.createdTime.toDateString()}</p>
        <p>{entity.foler} · {tags}</p>
        <div dangerouslySetInnerHTML={{ __html: entity.text }}></div>
      </div>
    </div>
  );
}

function ShowNoteR(props) {
  const entity = props.entity;
  return (
    <div id="ShowNote" class='row'>
      <div class="col-sm-12">
        <p></p>
        <p></p>
        <p>Last modified time: {entity.lastModifiedTime ? entity.lastModifiedTime.toDateString() : (new Date()).toDateString()}</p>
        <p>{entity.noteText}</p>
      </div>
    </div>
  );
}

function ShowNoteW(props) {
  const entity = props.entity;
  return (
    <div id="ShowNote" class='row'>
      <div class="col-sm-12">
        <p></p>
        <p></p>
        <p>Last modified time: {entity.lastModifiedTime ? entity.lastModifiedTime.toDateString() : (new Date()).toDateString()}</p>
        <div class="form-group">
          <textarea class="form-control" rows="60" id="comment">{entity.noteText}</textarea>
        </div>
      </div>
    </div>
  );
}

function ShowEntity(props) {
  const entity = props.entity;
  return (
    <div id="ShowEntity">
      <div class="row">
        <div class="col-sm-6">
          <ShowPage entity={entity}/> 
        </div>
        <div class="col-sm-6">
          <ShowNoteW entity={entity}/> 
        </div>
      </div>
    </div>
  );
}


const NotFound = () => <h1>Not Found</h1>;

function UIHome() {
  return (
    <Homelogic />
  );
}

function UIE1Entity() {
  return (
    <div>
      <EntityHead />
      <div class="showEntity">
        <ShowEntity entity={initialEntities[0]}/>
      </div>
    </div>
  );
}

function UIE1Page() {
  return (
    <div>
      <EntityHead />
      <div class="showPage">
        <ShowPage entity={initialEntities[0]}/>
      </div>
    </div>
  );
}

function UIE1Note() {
  return (
    <div>
      <EntityHead />
      <div class="showNoteR">
        <ShowNoteR entity={initialEntities[0]}/>
      </div>
    </div>
  );
}

function UIE2Entity() {
  return (
    <div>
      <EntityHead />
      <div class="showEntity">
        <ShowEntity entity={initialEntities[1]}/>
      </div>
    </div>
  );
}

function UIE2Page() {
  return (
    <div>
      <EntityHead />
      <div class="showPage">
        <ShowPage entity={initialEntities[1]}/>
      </div>
    </div>
  );
}

function UIE2Note() {
  return (
    <div>
      <EntityHead />
      <div class="showNoteR">
        <ShowNoteR entity={initialEntities[1]}/>
      </div>
    </div>
  );
}

function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/home" component={UIHome} />
      <Route path="/e1-page-note" component={UIE1Entity} />
      <Route path="/e1-page" component={UIE1Page} />
      <Route path="/e1-note" component={UIE1Note} />
      <Route path="/e2-page-note" component={UIE2Entity} />
      <Route path="/e2-page" component={UIE2Page} />
      <Route path="/e2-note" component={UIE2Note} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  
  return (
    <Router>
      <div>
      <NavBar />
      <Contents />
      </div>
    </Router>
  );
}

export default App;
