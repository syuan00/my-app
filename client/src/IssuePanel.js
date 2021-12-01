import React from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import IssueAddNavItem from './IssueAddNavItem.js';
const IssueOperators = withRouter(({ issue, location: { search } }) => {
    const selectLocation = { pathname: `/issues/${issue.id}`, search };
    return (  
        <div>
            <Link to={`/page-note/${issue.id}`} style = {{marginRight:"0"}}>Open</Link>
            {' | '}
            <NavLink to={selectLocation}>Edit</NavLink>
        </div>
    );
  });

export default class IssuePanel extends React.Component {
    constructor(){
      super()
      this.handleHome = this.handleHome.bind(this)
      this.handleMark = this.handleMark.bind(this)
      this.handleRead = this.handleRead.bind(this)
      this.handleFolder = this.handleFolder.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
    }
    handleDelete(e){
      e.preventDefault()
      const issue = this.props.issue;
      this.props.deleteOnePage(issue);
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
                  <IssueAddNavItem link = {issue.link} summary = {issue.summary} title = {issue.title} id = {issue.id}/>
                  <IssueOperators key={issue.id} issue={issue} />
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
                  <button class = 'btn' onClick = {this.handleDelete}><span className="glyphicon glyphicon-trash"></span></button>                  
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
  
  
           
    
        </div>
      )
    }
  }

  