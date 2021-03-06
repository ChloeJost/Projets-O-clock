// on charge les env vars
const dotenv = require('dotenv');
dotenv.config();

const Quizz = require('./app/models/quizz');
const User = require('./app/models/user');
const Question = require('./app/models/question');
const Answer = require('./app/models/answer');
const Level = require('./app/models/level');
const Tag = require('./app/models/tag');

/**
 * Test des relations
 */

  /* User <-> Quizz */
// User.findAll({
//   include: ['quizzes']
// }).then( (users) => {
//   for( let user of users) {
//     console.log(user.getFullName(), user.quizzes.length);
//   }
// });



  /* Quizz <-> Question */
// Quizz.findByPk(1,{
//   include: ["questions"]
// }).then( (quizz) => {
//   console.log(quizz);
// });

// Question.findByPk(1, {
//   include: ["quizz"]
// }).then( (question) => {
//   console.log(question);
// });




  /* Question <-> Answer */
//  Question.findByPk(1,{
//    include: ["answer"]
//  }).then( (question) => {
//    console.log(question);
//  });

// Answer.findByPk(1,{
//   include: ["question"]
// }).then( (answer) => {
//   console.log(answer);
// });



  /* Question <-> Level */
// Question.findByPk(1,{
//   include: ["level"]
// }).then( (question) => {
//   console.log(question);
// });

// Level.findByPk(1, {
//   include: ["questions"]
// }).then( (level) => {
//   console.log(level);
//   console.log( `${level.questions.length} questions de niveau ${level.name}`);
// });


  /* Quizz <-> Tag */
// Quizz.findByPk(1,{
//   include: ["tags"]
// }).then( (quizz) => {
//   console.log(quizz);
//   let tagNames = quizz.tags.map( x=> x.name).join(',');
//   console.log( `${quizz.title} est assiocié au tags : ${tagNames}` );
// });

// Tag.findByPk(1,{
//   include: ["quizzes"]
// }).then( (tag) => {
//   console.log(tag);
//   console.log( `le Tag ${tag.name} est associé à ${tag.quizzes.length} Quizzes`);
// });


  /* Tag -> Question -> User */
Tag.findByPk(1,{
  include: [{
    association: "quizzes",
    include: ["author"]
  }]
}).then( (tag) => {
  let message = '';
  for (let quizz of tag.quizzes) {
    message += `${quizz.title}, écrit par ${quizz.author.getFullName()}\n`;
  }

  console.log( `${tag.name} concerne : \n`+message );
});
