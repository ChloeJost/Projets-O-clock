const express = require('express');

const router = express.Router();


const mainController = require('./controllers/mainController');
const typeController = require('./controllers/typeController');
const teamController = require('./controllers/teamController');
const searchController = require('./controllers/searchController');

router.get('/', mainController.homePage );
router.get('/pokemon/:numero', mainController.pokemonPage);

router.get('/types', typeController.typesPage);
router.get('/type/:typeId', typeController.pokemonsByType);

router.get('/team', teamController.teamPage);
router.get('/team/add/:numero', teamController.addToTeam);
router.get('/team/delete/:numero', teamController.deleteFromTeam);

router.post('/search', searchController.searchResults);


router.use( mainController.page404 );

module.exports = router;