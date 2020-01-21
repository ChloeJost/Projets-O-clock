const express = require('express');


const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');


const router = express.Router();


router.get('/', mainController.homePage);


router.get('/article/:id', mainController.articlePage);


router.get('/cart', cartController.cartPage);


router.get('/cart/add/:id', cartController.cartAdd);


router.get('/cart/delete/:id', cartController.cartDelete);


module.exports = router;