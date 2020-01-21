const path = require('path');
const dataMapper = require('../dataMapper');

const mainController = {

  homePage: (request, response) => {
    dataMapper.getAllFigurine((figurineList) => {
      response.render('accueil', {figurineList : figurineList});
    });
    
  },


  articlePage: (request, response) => {

    const figurineId = parseInt(request.params.id);

    if(isNaN(figurineId)){
    }

    dataMapper.getOneFigurineById(figurineId, (figurines) => {
      const reviewList = [];
      for(let figurine of figurines){

        reviewList.push({
          AUTHOR: figurine.AUTHOR,
          TITLE: figurine.TITLE,
          MESSAGE: figurine.MESSAGE,
          NOTE: figurine.NOTE
        });
      }
      response.render('article', {figurine: figurines[0], reviewList: reviewList});
    });

  }

};


module.exports = mainController;
