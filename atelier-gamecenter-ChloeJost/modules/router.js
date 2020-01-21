const express = require('express');
const router = express.Router();

// les données, réimportées parce que j'en ai besoin aussi dans mon routeur
// heureusement, require a un système de cache donc pas d'alourdissement de l'application
const games = require('../games.json');

// définir les routes
router.get('/', (request, response, next) => {
    response.render('index');
    next();
});

/*
// http://gamehub.com/game/fourchette => bonne idée, on indique dans l'url qu'on va arriver sur une page de jeu
// http://gamehub.com/fourchette => peut mieux faire, c'est pas très indicatif
router.get('/game/fourchette', (request, response) => {
    response.render('fourchette');
});

router.get('/game/diceRoller', (request, response) => {
    response.render('diceRoller', {css: 'diceRoller'});
});
*/

// une unique route paramétrée pour servir tous les jeux disponibles #lePrecieux
router.get('/game/:nomDuJeu', (request, response, next) => {
    let nomDuJeu = request.params.nomDuJeu;

    // déjà fait lundi, c'est glamour, c'est concis, je prends <3
    // le tableau games est filtré : il est parcouru et chacun de ses éléments est passé en argument du callback
    // le callback se charge de vérifier que la propriété name de cet élément est égale à nomDuJeu (le paramètre de route)
    // si c'est le cas, l'élément est gardé, placé au chaud dans un nouveau tableau "filtre" créé pour l'occasion
    // si ce n'est pas le cas, l'élément n'est pas placé dans le tableau "filtre"
    let jeu = games.filter((game) => game.name === nomDuJeu).pop();

    // mais si le jeu demandé n'existe pas ? ex: /game/warcraft3
    // que va contenir jeu ? apparemment undefined
    if (!jeu) {
        router.use((err, rq, res, next) => {
            console.error(err.stack);
            res.statut(500).send('Jeu non trouvé !');
            next();
        })
    }

    // la partie ardue (mais trop cool)
    // note 1 : pour que tout soit automatisé, il faudra qu'il existe une view portant le name du jeu
    // note 2 : il faudra également prévoir le js et le css nécessaire et noter le nom des deux fichiers dans games.json
    response.render(jeu.name, jeu);
});


// pour exporter un objet (=l'intérêt d'un module), on utilise module.exports
module.exports = router;