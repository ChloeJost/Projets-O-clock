// essentiels
const express = require('express');
const router = express.Router();

// donnees
const article = require('../article.json');
router.use(express.static('public'));


router.get('/', (req, res, next) => {
    res.render('index');
});



router.get('/article/:id', (req, res, next) => {
    let id = req.params.id;
    let art = article.filter((article) => article.id === id).pop();
    res.render('article', art);

    if(!article){
        next();
        return;
    }
});

module.exports = router;