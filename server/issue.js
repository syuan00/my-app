const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');


/**
 * @author Hu Xuan
 * @description get an issue by id
 */
 async function get(_, { id }) {
    const db = getDb();
    const issue = await db.collection('issues').findOne({ id });
    return issue;
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
  
async function list(_,{issue}) {
    // await getListValidation(issue)
    const db = getDb();
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
    const db = getDb();
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
 async function add(_, { issue }) {
    const db = getDb();
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

async function changeCategory(_,{issue}){
    const db = getDb();
    await getListValidation(issue);
    const curLink = issue.link;
    const curCategory = issue.category;
    const newIssue = await db.collection('issues').updateOne({link:curLink},{$set:{category:curCategory}});
    const savedIssue = await db.collection('issues').findOne({link:curLink});
    return savedIssue
}

/**
 * @author Hu Xuan
 * @description 目前仅用于update函数的validate函数
 */
function validate(issue) {
    const errors = [];
    // if (issue.title.length < 3) {
    //   errors.push('Field "title" must be at least 3 characters long.');
    // }
    // if (issue.status === 'Assigned' && !issue.owner) {
    //   errors.push('Field "owner" is required when status is "Assigned"');
    // }
    if (errors.length > 0) {
      throw new UserInputError('Invalid input(s)', { errors });
    }
}

/**
 * @author Hu Xuan
 * @description update an issue
 */
 async function update(_, { id, changes }) {
    const db = getDb();
    if (changes.title || changes.tags || changes.text || changes.snapshot || changes.noteText) {
      const issue = await db.collection('issues').findOne({ id });
      Object.assign(issue, changes);
      validate(issue);
    }
    await db.collection('issues').updateOne({ id }, { $set: changes });
    const savedIssue = await db.collection('issues').findOne({ id });
    return savedIssue;
}

/**
 * 
 * TODO: old code from tut5
 */
 async function issueDeleteValidate(issue){
    const db = getDb();
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
async function remove(_,{issue}){    
    const db = getDb();
    await issueDeleteValidate(issue);
    let res = await db.collection('issues').removeOne({id:deletedId});
    await updateIDForDelete(deletedId);
    return res;
}
  
/**
 * 
 * TODO: old code from tut5
 */
async function clearAll(_,{issue}){
    const db = getDb();
    await db.collection('issues').remove({});
    return issue;
}
  
async function updateIDForDelete(deletedId){
    const db = getDb();
    curNum = await db.collection('issues').count();
    for(var i = deletedId+1; i <= curNum+1; i++){
        await db.collection('issues').updateOne({id:i},{$set:{id:i-1}});
    }
}

module.exports = {
    list,
    add,
    changeCategory,
    get,
    update,
    delete: remove,
    clearAll,
};