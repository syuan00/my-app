import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';
import {
  Navbar, Nav, NavItem, NavDropdown, Tooltip, OverlayTrigger,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import "./App.css";

const initialEntities = [
  {
    type: "page", id: 2, title: 'How to Take Care of a Cat', 
    link: 'https://www.wikihow.com/Take-Care-of-a-Cat', 
    summary: "This article was co-authored by Molly DeVoss. Molly DeVoss is a Certified Feline Training and Behavior \
    Specialist (CFTBS), a Certified Cat Behavior Consultant (CCBC), a Fear Free Certified Trainer (FFCT), and the \
    Founder of Cat Behavior Solutions. Molly specializes in using positive reinforcement to modify and",
    summaryImage: "https://www.wikihow.com/Take-Care-of-a-Cat#/Image:Take-Care-of-a-Cat-Step-6-Version-3.jpg",
    createdTime: new Date('2021-09-04'),
    isMarked: false, isRead: false,
    foler: null,
    tags: null,
    text: "<p>With their playful personalities, affectionate behavior, and adorable faces, cats can be the ideal pet. But, despite popular opinion, cats are not maintenance-free! To keep your cat healthy and happy, you need to know how to take care of and provide the best possible life for your new furry friend.</p>\
    <p>1</p>\
    <p>Encourage the cat to use a litter box.[1] Most cats will prefer the litter box to other parts of the house because of the texture of the litter.[2] But, there are still steps you need to take to make sure you're offering the litter box as the best place to use the bathroom.</p>\
    <p>Place the box in a quiet spot where the cat won’t be bothered by people, dogs, or loud noises.</p>\
    <p>To keep the litter box clean, make sure you scoop the litter daily, and clean the box weekly. You should also replace or refresh the litter at least once a week.[3]</p>\
    <p>Provide enough litter boxes for more than one cat. If you have 2 cats, you need 3 litter boxes in different areas of the home. One cat might try to intimidate a less dominate cat away from using a single box.</p>\
    <p>2</p>\
    <p>Make the litter box a comfortable place. Don't frighten or startle your cat when it's using the box, or it may form a bad association with the box and start avoiding it. Buy a large box, even if you have to spend a little money on it. Cats are more comfortable in a larger (in area, not height) box.[4]</p>\
    <p>Don’t switch brands of litter on your cat, because cats don’t like sudden change. Switching from a clay litter to a scoopable clumping type of litter or vice versa might upset the cat so much it stops using the box.</p>\
    <p>Don’t use heavily scented litters that might deter a cat from litter box use.</p>\
    <p>3</p>\
    <p>Take young or old cats needs into consideration. Keep in mind that kittens and older cats with arthritis or other health problems may have problems getting in and out of a box that's too tall. Use low-height boxes in an easily accessible area for kittens and cats with special needs, or buy an adjustable litter box.[5]</p>\
    <p>4</p>\
    <p>Provide the cat with a scratching post. Scratching is a normal part of cat behavior, and there's no way you can train it out of them. If your cat still has its claws, he'll need one or two scratching posts to keep him from scratching up furniture, woodwork, and so on. By providing a post, you allow the cat to indulge in normal, healthy behavior.[6]</p>\
    <p>5</p>\
    <p>Discourage the cat from exploring forbidden surfaces. Cats are curious, and will jump on counters or other places you'd like them to steer clear of. Scat mats, a perfectly timed mist of water from a spray bottle, or even a stern “no” can correct this behavior.[7]XExpert Source</p>\
    <p>Molly DeVossMolly DeVoss</p>\
    <p>Certified Feline Training and Behavior Specialist & Certified Cat Behavior Consultant</p>\
    <p>Expert Interview. 28 June 2021.</p>\
    <p>With time and patience, you can teach your cat to stay away from your protected areas.</p>\
    <p>You can also use a rattle can (an empty soda can filled with a few pebbles and the opening taped over). Toss it gently on the ground to scare a cat away from forbidden surfaces. DO NOT throw the can at the cat, for that may harm your cat.</p>\
    <p>6</p>\
    <p>Consider using feline pheromone products. These products, which fill the air with calming synthetic pheromones, come as sprays or diffusers that plug into electrical outlets.[8] They can help resolve litter box or scratching issues, and have also been proven to calm stressed or anxious cats.</p>\
    ",
    snapshot: "https://tva1.sinaimg.cn/large/008i3skNly1gv5zpmrtvwj60u09kxkdb02.jpg",
    noteText: null,
    lastMotifiedTime: null,
  },
  {
    type: "page", id: 1, title: 'Spicy Ahi Poke Salad', 
    link: 'https://www.allrecipes.com/recipe/256937/spicy-ahi-poke-salad/', 
    summary: "Explore Allrecipes Allrecipes Allrecipes Find a Recipe Explore The Foolproof Way to Cook Bacon in the Microwave \
    The Foolproof Way to Cook Bacon in the Microwave",
    summaryImage: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8159186.jpg&q=85",
    createdTime: new Date('2021-09-03'),
    isMarked: true, isRead: true,
    foler: "Recipes",
    tags: ["seafoods", "salad"],
    text: "<p>Ingredients</p>\
    <p>Original recipe yields 5 servings</p>\
    <p>Ingredient Checklist</p>\
    <p>1 pound ahi tuna, cut into 1/2-inch cubes</p>\
    <p>¼ cup minced green onion</p>\
    <p>2 tablespoons ground roasted macadamia nuts</p>\
    <p>2 tablespoons chopped fresh cilantro, or more to taste</p>\
    <p>1 tablespoon fresh lime juice</p>\
    <p>2 teaspoons sesame oil, or more to taste</p>\
    <p>1 teaspoon minced fresh ginger</p>\
    <p>1 teaspoon red pepper flakes</p>\
    <p>1 teaspoon sriracha sauce, or to taste</p>\
    <p>ADD ALL INGREDIENTS TO SHOPPING LIST </p>\
    <p>Step 1</p>\
    <p>Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; refrigerate for 2 hours.</p>\
    <p>Editor's Note:</p>\
    <p>Consuming raw seafood may increase your risk of food borne illness, especially if you have certain medical conditions.</p>\
    <p>Nutrition Facts</p>\
    <p>Per Serving: 144 calories; protein 21.7g; carbohydrates 1.6g; fat 5.5g; cholesterol 40.9mg; sodium 89.2mg. Full Nutrition</p>\
    ",
    snapshot: "https://tva1.sinaimg.cn/large/008i3skNgy1gv606b0i3nj60u03gt4b602.jpg",
    noteText: "\n\
    \n\
    Ingredient\n\
    1 pound ahi tuna, cut into 1/2-inch cubes\n\
    ¼ cup minced green onion\n\
    2 tablespoons ground roasted macadamia nuts\n\
    2 tablespoons chopped fresh cilantro, or more to taste\n\
    1 tablespoon fresh lime juice\n\
    2 teaspoons sesame oil, or more to taste\n\
    1 teaspoon minced fresh ginger\n\
    1 teaspoon red pepper flakes\n\
    1 teaspoon sriracha sauce, or to taste\n\
    \n\
    Steps\n\
    1. Combine tuna, green onion, macadamia nuts, cilantro, lime juice, sesame oil, ginger, red pepper flakes, and sriracha sauce in a bowl; \n\
    2. Refrigerate for 2 hours.\n\
    ",
    lastMotifiedTime: new Date('2021-09-03'),
  },
];

class PageHead extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">

          <div className="navbar-header">
            <a className="navbar-brand" style={{ color: "black" }}><b>PageBox</b></a>
          </div>

          <ul className="nav navbar-nav">
            <form className="navbar-form" >
              <div className="form-group" >
                <input type="text" className="form-control" placeholder="Search"/>
              </div>
              <button className="btn btn-default" type="submit"> <i className="glyphicon glyphicon-search"></i>
              </button>
            </form>
          </ul>

          <ul className="nav navbar-nav navbar-right">
            <li><a className = "btn btn-link" href = '#' role = "button"  data-toggle = "modal" data-target = "#myAddLinkModal"><span className="glyphicon glyphicon-link"></span> Add Link</a></li>
            <li><a className = "btn btn-link" href = '#' role = "button" data-toggle = "modal" data-target = "#mySignUpModal"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li><a className = "btn btn-link" href = '#' role = "button" data-toggle="modal" data-target="#myLoginModal"> <span className="glyphicon glyphicon-log-in"></span> Login </a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

class SideBar extends React.Component {
  render() {
    return (
       
       
      <div class="w3-sidebar w3-light-grey w3-bar-block" style={{ width: "15%"}}>
        <a href="#" class="w3-bar-item w3-button"><span className="glyphicon glyphicon-home"></span> Home</a>
        <a href="#" class="w3-bar-item w3-button"><span className="glyphicon glyphicon-bookmark"></span> Marks</a>
        <a href="#" class="w3-bar-item w3-button"><span className="glyphicon glyphicon-eye-open"></span> Unread{" "}</a>
        <a href="#" class="w3-bar-item w3-button"><span className="glyphicon glyphicon-folder-open"></span> My Folder </a>
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

class MainContent extends React.Component {
  render() {
    const IssuePanels = initialEntities.map(issue => <IssuePanel key={issue.id} issue={issue} />)
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
}
 
//ANCHOR: helper class
class IssuePanel extends React.Component {

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
                <button class = 'btn'><span className="glyphicon glyphicon-bookmark"></span></button>
                <button class = 'btn'><span className="glyphicon glyphicon-eye-open"></span></button>
                <button class = 'btn'><span className="glyphicon glyphicon-folder-open"></span></button>
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

class ModalCollection extends React.Component{
  
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
                        <input type="url" placeholder="Enter URL" name="url" required/>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-default" 
                      data-dismiss="modal">cancel
                  </button>
                  <button type="button" class="btn btn-primary">
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

// //ANCHOR: Top level class
// function App() {
//   return (
//     <React.Fragment>
//       <ModalCollection />
//       <PageHead />
//       <SideBar />
//       <MainContent />
//     </React.Fragment>
//   );
// }
const NotFound = () => <h1>Not Found</h1>;

function UIHome() {
  return (
    <div>
      <ModalCollection />
      <PageHead />
      <SideBar />
      <MainContent />
    </div> 
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
