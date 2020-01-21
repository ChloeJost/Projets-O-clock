const path = require('path');
const dataMapper = require('../dataMapper');

const cartController = {

  cartPage: (request, response) => {
    dataMapper.getAllFigurine((figurineList) => {
      const listFigurineInCart = [];

      let totalHT = 0;
      const fraisPort = 9.99;
      const txTVA = 0.2;

      for (let figurine of figurineList) {  
        if (request.session.cart[figurine.ID]) {
          figurine.QTY = request.session.cart[figurine.ID];
          listFigurineInCart.push(figurine);
          totalHT += figurine.PRICE * figurine.QTY;
        }
      }

      totalHT += fraisPort;

      const montantTVA = parseFloat(totalHT * txTVA);
      const totalTTC = parseFloat(totalHT + montantTVA);

      response.render('panier', {
        listFigurineInCart: listFigurineInCart,
        totalHT: totalHT,
        fraisPort: fraisPort,
        txTVA: txTVA,
        montantTVA: montantTVA,
        totalTTC: totalTTC
      });
    });

  },

  cartAdd: (request, response) => {
    const figurineId = parseInt(request.params.id);

    if (isNaN(figurineId)) {
      console.error("l'id n'est pas une nombre");
    }
    if (!request.session.cart[figurineId]) {
      request.session.cart[figurineId] = 0;
    }
    request.session.cart[figurineId]++;
    response.redirect('/cart');

  },

  cartDelete: (request, response) => {
    const figurineId = parseInt(request.params.id);

    if (isNaN(figurineId)) {
      console.error("l'id n'est pas une nombre");
    }

    if(request.session.cart[figurineId] && request.session.cart[figurineId] > 0){
      request.session.cart[figurineId]--;
    }
    if(request.session.cart[figurineId] === 0){
      delete request.session.cart[figurineId];
    }

    console.log(request.session.cart);

    response.redirect('/cart');

  }

};



module.exports = cartController;
