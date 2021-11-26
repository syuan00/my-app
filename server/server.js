const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';
let db;
let aboutMessage = "Issue Tracker API v1.0";
let deletedId = -1;
const MAXSIZE = 25;

/**
 * @author Hu Yue
 * @description for the format of the time
 */
const GraphQLDateTime = new GraphQLScalarType({
  name: 'GraphQLDateTime',
  description: 'A DateTime() type in GraphQL as a scalar',
  serialize(value) {
    return value.toLocaleString();
  },
  parseValue(value) {
    const dateValue = new Date(value);
    return isNaN(dateValue) ? undefined : dateValue;
  },
  parseLiteral(ast) {
    if (ast.kind == Kind.STRING) {
      const value = new Date(ast.value);
      return isNaN(value) ? undefined : value;
    }
  },
});

/**
 * @author Hu Yue
 * @description define the resolver
 */
const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
    issueChangeCategory,

    issueDelete,
    issueClearAll,
  },
  GraphQLDateTime,
};

/**
 * @author Hu Yue
 * @description query support: get the message
 */
function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}
/**
 * @author Hu Yue
 * @description query support: get the issueList
 */
async function getListValidation(issue){
  const errors = [];
  if(issue.user_id == null || issue.user_id.length == 0){
    errors.push("Please login First!")
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}



async function issueList(_,{issue}) {
  // await getListValidation(issue)
  const category = issue.category
  const userId = issue.user_id
  const issues = await db.collection('issues').find({user_id:userId, category:category}).toArray();
  return issues;
}

/**
 * @author: Hu Yue
 * @description helper function: check and process the link client added, delete whitespace at the front and end.
 * give error if link added before or empty link
 */
async function issueAddValidate(issue) {
  const curLink = issue.link.replace(/^\s+|\s+$/gm, '');
  issue.link = curLink;
  const existed = await db.collection('issues').findOne({link:curLink});
  const errors = [];
  // check if added before
  if(curLink.length == 0){
    errors.push("Cannot type in empty url!!")
  }
  if(existed !== null){
    errors.push("This link has been added before!");
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

/**
 * @author Hu Yue
 * @description add new link to the databases
 * @TODO: use placeholder for some params, need to Parse the url and replace
 */
async function issueAdd(_, { issue }) {
  await getListValidation(issue);
  await issueAddValidate(issue);
  issue.createdTime = new Date();
  issue.id = await db.collection('issues').count()+1;
  issue.category = "home"
  //placeholder
  issue.type = "Page_placeholder"
  issue.title = "title_placeholder"
  issue.summary = "summary_placeholder"
  issue.noteText = "noteText_placeholder"

  const result = await db.collection('issues').insertOne(issue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

async function issueChangeCategory(_,{issue}){
  await getListValidation(issue);
  const curLink = issue.link;
  const curCategory = issue.category;
  const newIssue = await db.collection('issues').updateOne({link:curLink},{$set:{category:curCategory}});
  const savedIssue = await db.collection('issues').findOne({link:curLink});
  return savedIssue
}


/**
 * @author Hu Yue
 * @description used to connect to the database
 */
async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

/**
 * 
 * TODO: old code from tut5
 */
async function issueDeleteValidate(issue){
  const curName = issue.name.replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, ' ');
  const curPhone = issue.phone.replace(/(^\s*)|(\s*$)/g, "");
  issue.name = curName;
  issue.phone = curPhone;
  const existed = await db.collection('issues').findOne({name: curName, phone: curPhone});
  const errors = [];

  if(curName.length == 0 || curPhone.length == 0){
    errors.push("Please enter your full information!")
  }
  else if(existed === null){
    errors.push("Sorry, we cannot find your order, please check again.")
  }


  if(existed !== null){
    deletedId = existed.id;
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}
/**
 * 
 * TODO: old code from tut5
 */
async function issueDelete(_,{issue}){
  await issueDeleteValidate(issue);
  let res = await db.collection('issues').removeOne({id:deletedId});
  await updateIDForDelete(deletedId);
  return res;
}

/**
 * 
 * TODO: old code from tut5
 */
async function issueClearAll(_,{issue}){
  await db.collection('issues').remove({});
  return issue;
}


// helper function
function checkValidPhoneNumber(phone) {
  for (var i = 0; i < phone.length; i++) {
    if (phone[i] > '9' || phone[i] < '0') {
      return false;
    }
  }
  return true;
}

async function updateIDForDelete(deletedId){
  curNum = await db.collection('issues').count();
  for(var i = deletedId+1; i <= curNum+1; i++){
    await db.collection('issues').updateOne({id:i},{$set:{id:i-1}});
  }
}

/**
 * 
 * @author Hu Yue
 * @description settings for server
 */
const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
});
const app = express();
server.applyMiddleware({ app, path: '/graphql' });
(async function () {
  try {
    await connectToDb();
    app.listen(5000, function () {
      console.log('API server started on port 5000');
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
})();