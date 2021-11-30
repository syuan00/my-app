import React from 'react';
// import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Col, Panel, Form, FormGroup, FormControl, ControlLabel,
  ButtonToolbar, Button, Alert
} from 'react-bootstrap';


import graphQLFetch from './graphQLFetch.js';
import TextInput from './TextInput.js';
import Toast from './Toast.js';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
      invalidFields: {},
      showingValidation: false,
      toastVisible: false,
      toastMessage: '',
      toastType: 'success',
      displayPage: 'none',
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
    this.setDisplay = this.setDisplay.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { match: { params: { id: prevId } } } = prevProps;
    const { match: { params: { id } } } = this.props;
    if (id !== prevId) {
      this.loadData();
    }
  }

  setDisplay() { //编辑按钮的单击事件，修改状态机displayPage的取值
    if (this.state.displayPage == 'none') {
        this.setState({
            displayPage: 'block',
        })
    }
    else if (this.state.displayPage == 'block') {
        this.setState({
            displayPage: 'none',
        })

    }
  }

  onChange(event, naturalValue) {
    const { name, value: textValue } = event.target;
    const value = naturalValue === undefined ? textValue : naturalValue;
    this.setState(prevState => ({
      issue: { ...prevState.issue, [name]: value },
    }));
  }

  onValidityChange(event, valid) {
    const { name } = event.target;
    this.setState((prevState) => {
      const invalidFields = { ...prevState.invalidFields, [name]: !valid };
      if (valid) delete invalidFields[name];
      return { invalidFields };
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.showValidation();
    const { issue, invalidFields } = this.state;
    if (Object.keys(invalidFields).length !== 0) return;

    const query = `mutation issueUpdate(
      $id: Int!
      $changes: IssueUpdateInputs!
    ) {
      issueUpdate(
        id: $id
        changes: $changes
      ) {
        id
      }
    }`;

    const { id, user_id, type, title, link, summary, summaryImage, createdTime, category, folder, tags, text, snapshot, lastMotifiedTime, ...changes } = issue;
    const data = await graphQLFetch(query, { changes, id }, this.showError);
    if (data) {
      this.setState({ issue: data.issueUpdate });
      this.showSuccess('Updated issue successfully');
      this.loadData();
    }
  }

  async loadData() {
    const query = `query issue($id: Int!) {
      issue(id: $id) {
        id title category 
        link createdTime tags
        tags text snapshot noteText
      }
    }`;

    const { match: { params: { id } } } = this.props;
    const data = await graphQLFetch(query, { id }, this.showError);
    this.setState({ issue: data ? data.issue : {}, invalidFields: {} });
  }

  showValidation() {
    this.setState({ showingValidation: true });
  }

  dismissValidation() {
    this.setState({ showingValidation: false });
  }

  showSuccess(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'success',
    });
  }

  showError(message) {
    this.setState({
      toastVisible: true, toastMessage: message, toastType: 'danger',
    });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  render() {
    const { issue: { id } } = this.state;
    const { match: { params: { id_: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { invalidFields, showingValidation } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0 && showingValidation) {
      validationMessage = (
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          Please correct invalid fields before submitting.
        </Alert>
      );
    }

    const { issue: { title, category } } = this.state;
    const { issue: { link, createdTime, tags, lastModifiedTime} } = this.state;
    const { issue: { noteText} } = this.state;
    const { toastVisible, toastMessage, toastType } = this.state;

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" style={{ color: "black" }}><b>PageBox</b></a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              {/* <li><a className = "btn btn-link" href = '#' role = "button"  data-toggle = "modal" data-target = "#myAddLinkModal"><span className="glyphicon glyphicon-link"></span> Add Link</a></li>*/}
            </ul>
          </div>
        </nav>
        <div style={{ margin: "10%", marginTop:"75px"}}>
            <h1>{title}</h1>
            <p>{link}</p>
            <p>created: {createdTime}</p>
            <p>{category}{tags ? ` · ${tags.map(x => '#' + x).join(' ')}` : ''}</p>
            {/* 通过icon实现编辑图标 */}
            <div style={{ background: '#fff', paddingTop: '10px' }}>
              <Button onClick={this.setDisplay}>显示Page</Button>
            </div>
            <div display={this.state.displayPage}>1</div>
            <Form horizontal onSubmit={this.handleSubmit}>
              <FormGroup>
                
                <Col sm={6}>
                  <iframe loading="lazy" src={link} style={{border:"0px #ffffff none"}} scrolling="yes" frameborder="1" marginheight="0px" marginwidth="0px" height="640px" width="100%" allowfullscreen></iframe>
                </Col>
                
                <Col sm={6}>
                  <p>Last modified time: {lastModifiedTime ? lastModifiedTime.toDateString() : (new Date()).toDateString()}</p>
                  <FormControl
                    componentClass={TextInput}
                    tag="textarea"
                    rows={30}
                    cols={50}
                    name="noteText"
                    value={noteText}
                    onChange={this.onChange}
                    key={id}
                  />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col smOffset={10} sm={6}>
                  <ButtonToolbar>
                    <Button bsStyle="primary" type="submit">Submit</Button>
                    <LinkContainer to="/issues">
                      <Button bsStyle="link">Back</Button>
                    </LinkContainer>
                  </ButtonToolbar>
                </Col>
              </FormGroup>
            </Form>
          
          <Toast
            showing={toastVisible}
            onDismiss={this.dismissToast}
            bsStyle={toastType}
          >
            {toastMessage}
          </Toast>
        </div>
      </div>
    );
  }
}