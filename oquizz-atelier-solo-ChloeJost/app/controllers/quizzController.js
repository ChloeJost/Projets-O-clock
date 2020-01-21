const Quizz = require('../models/quizz');
const Tag = require('../models/tag');

const quizzController = {

  quizzPage: async (req, res) => {
    try {
      const quizzId = parseInt(req.params.id);
      const quizz = await Quizz.findByPk(quizzId,{
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level']},
          { association: 'tags'}
        ]
      });
      if (req.session.user) {
        res.render('play_quizz', {quizz});
      } else {
        res.render('quizz', {quizz});
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },

  listByTag: async (req, res) => {
    try {
      const tagId = parseInt(req.params.id);
      const tag = await Tag.findByPk(tagId,{
        include: [{
          association: 'quizzes',
          include: ['author']
        }]
      });
      const quizzes = tag.quizzes;
      res.render('index', { quizzes });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  playQuizz: async (req, res) => { 
    console.log(req.body);
    try {
      const quizzId = parseInt(req.params.id);
      const quizz = await Quizz.findByPk(quizzId, {
        include: [
          { association: 'author'},
          { association: 'questions', include: ['answers', 'level', 'good_answer']},
          { association: 'tags'}
        ]
      });

      let points = 0;

      for (let question of quizz.questions) {

        let inputName = "question_"+question.id;
        if (req.body[inputName]) {
 
          if(req.body[inputName] == question.good_answer.id) {
            points ++; 
          }
        }
      }

      res.render('quizz_results',{
        quizz,
        points,
        user_answers: req.body
      });
      
    } catch (error) {
      res.status(500).send(error);
    }
  }

};

module.exports = quizzController;