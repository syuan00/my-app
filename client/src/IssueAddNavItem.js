import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import Toast from './Toast.js';

class IssueAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    console.log(props.user_id);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const issue = {
      title: document.getElementById("title").innerText,
      link: this.props.link,
      summary: document.getElementById("summary").innerText,
      category: this.props.category,
      user_id: this.props.user_id
    };
    
   
    const query = `mutation issueEditIntro($issue: IssueInputs!) {
      issueEditIntro(issue: $issue) {
        link
      }
    }`;

    const data = await graphQLFetch(query, { issue }, this.showError);
    if (data) {
      const { history } = this.props;
      history.push(``);
    }
    this.props.keepInCurCategory(issue);
  }

  render() {
    const { showing } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;
    return (
      <React.Fragment>
        <NavItem onClick={this.showModal}>
          <OverlayTrigger
            // placement="left"
            delayShow={1000}
            overlay={<Tooltip id="create-issue">Create Issue</Tooltip>}
          >
            <span class="glyphicon glyphicon-pencil"></span> 
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Please edit your introduction</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="issueEditIntro">
              <FormGroup>
                <label for="title"><b>title</b></label>
                <div id = "title" contentEditable="true"  type="myinput" placeholder="Enter title" name="title">{this.props.title}</div>
                <br/>
               
                <label for="summary"><b>summary</b></label>
                <div id = "summary" contentEditable="true"  type="summary" placeholder="Enter summary" name="summary" required> {this.props.summary}</div>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Confirm
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
        <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast>
      </React.Fragment>
    );
  }
}

export default withRouter(IssueAddNavItem);
