import React from 'react';
import { Link } from 'react-router-dom';

import graphQLFetch from './graphQLFetch.js';
// import NumInput from './NumInput.js';
// import DateInput from './DateInput.js';
// import TextInput from './TextInput.js';

export default class IssueEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {},
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
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
        id title status owner
        effort created due description
      }
    }`;

    const { id, created, ...changes } = issue;
    const data = await graphQLFetch(query, { changes, id });
    if (data) {
      this.setState({ issue: data.issueUpdate });
      alert('Updated issue successfully'); // eslint-disable-line no-alert
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
    const data = await graphQLFetch(query, { id });
    this.setState({ issue: data ? data.issue : {}, invalidFields: {} });
  }

  render() {
    const { issue: { id } } = this.state;
    const { match: { params: { id: propsId } } } = this.props;
    if (id == null) {
      if (propsId != null) {
        return <h3>{`Issue with ID ${propsId} not found.`}</h3>;
      }
      return null;
    }

    const { invalidFields } = this.state;
    let validationMessage;
    if (Object.keys(invalidFields).length !== 0) {
      validationMessage = (
        <div className="error">
          Please correct invalid fields before submitting.
        </div>
      );
    }

    const { issue: { title, category } } = this.state;
    const { issue: { link, createdTime, tags } } = this.state;
    const { issue: { text} } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>{`Editing issue: ${id}`}</h3>
        <h1>{title}</h1>
        <p>{link} · {createdTime}</p>
        <p>{category} · {tags}</p>
        <table>
          <tbody>
            <tr>
              <td>Created:</td>
              {/* <td>{created}</td> */}
            </tr>
            <tr>
              <td>Status:</td>
              <td>
                <select name="category" value={category} onChange={this.onChange}>
                  <option value="home">home</option>
                  <option value="mark">mark</option>
                  <option value="read">read</option>
                  <option value="foler">folder</option>
                </select>
              </td>
            </tr>
            {/* <tr>
              <td>Owner:</td>
              <td>
                <input
                  name="owner"
                  value={owner}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr> */}
            {/* <tr>
              <td>Effort:</td>
              <td>
                <input
                  name="effort"
                  value={effort}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr> */}
            {/* <tr>
              <td>Due:</td>
              <td>
                <input
                  name="due"
                  value={due}
                  onChange={this.onChange}
                  onValidityChange={this.onValidityChange}
                  key={id}
                />
              </td>
            </tr> */}
            {/* <tr>
              <td>Title:</td>
              <td>
                <input
                  size={50}
                  name="title"
                  value={title}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr> */}
            <tr>
              <td>Description:</td>
              <td>
                <input
                  tag="textarea"
                  rows={8}
                  cols={50}
                  name="description"
                  value={text}
                  onChange={this.onChange}
                  key={id}
                />
              </td>
            </tr>
            <tr>
              <td />
              <td><button type="submit">Submit</button></td>
            </tr>
          </tbody>
        </table>
        {validationMessage}
        <Link to={`/edit/${id - 1}`}>Prev</Link>
        {' | '}
        <Link to={`/edit/${id + 1}`}>Next</Link>
      </form>
    );
  }
}
