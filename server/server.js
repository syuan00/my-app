// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const port = process.env.PORT || 5000;
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.get("/api/hello", (req, res) => {
//   res.send({ express: "Hello From Express" });
// });
// app.post("/api/world", (req, res) => {
//   console.log(req.body);
//   res.send(
//     `I received your POST request. This is what you sent me: ${req.body.post}`
//   );
// });
// app.listen(port, () => console.log(`Listening on port ${port}`));


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

const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
    issueDelete,
    issueClearAll,
  },
  GraphQLDateTime,
};

function setAboutMessage(_, { message }) {
  return aboutMessage = message;
}

async function issueList() {
  const issues = await db.collection('issues').find({}).toArray();
  return issues;
}


async function issueAddValidate(issue) {
  const curName = issue.name.replace(/(^\s*)|(\s*$)/g, "").replace(/\s+/g, ' ');
  const curPhone = issue.phone.replace(/(^\s*)|(\s*$)/g, "");
  issue.name = curName;
  issue.phone = curPhone;
  const existed = await db.collection('issues').findOne({name: curName, phone: curPhone});
  const curSize = await db.collection('issues').count();

  const errors = [];
  // check for invalid entry name and phone number
  if(curName.length == 0 && curPhone.length == 0){
    errors.push("Please enter your information!");
  }
  else if(curName.length == 0){
    errors.push("Please enter your name!")
  }
  else if(!checkValidPhoneNumber(curPhone) || curPhone.length == 0){
    errors.push("Please enter valid phone number!")
  }
  // check if added before
  else if(existed !== null){
    errors.push("already in the waitingList");
  }
  //check the size of the table
  else if ((MAXSIZE - curSize) == 0) {
    errors.push("Current appointment is full, please come back later.");
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

async function issueAdd(_, { issue }) {
  await issueAddValidate(issue);
  issue.time = new Date();
  issue.id = await db.collection('issues').count()+1;

  const result = await db.collection('issues').insertOne(issue);
  const savedIssue = await db.collection('issues').findOne({ _id: result.insertedId });
  return savedIssue;
}

async function connectToDb() {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB at', url);
  db = client.db();
}

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

async function issueDelete(_,{issue}){
  await issueDeleteValidate(issue);
  let res = await db.collection('issues').removeOne({id:deletedId});
  await updateIDForDelete(deletedId);
  return res;
}


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