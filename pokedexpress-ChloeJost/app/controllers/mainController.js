
const dataMapper = require('../dataMapper');

const mainController = {
  homePage:  (req, res) => {
    dataMapper.getAllPokemons( (err, data) => {

      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.render('home', {
        pokemons: data.rows
      });
  
    });
  },

  pokemonPage: (req, res) => {
 
    res.locals.statsLabels = {
      pv: 'PV',
      attaque: 'Attaque',
      defense: 'Défense',
      attaque_spe:'Attaque Spé.',
      defense_spe:'Défense Spé.',
      vitesse: 'Vitesse'
    };
    const pokemonNum = req.params.numero;
    dataMapper.getPokemonDetails(pokemonNum, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      dataMapper.getPokemonTypes(pokemonNum, (err2, data2) => {
        if (err2) {
          console.log(err2);
          return res.status(500).send(err2);
        }
        res.render('details', {
          pokemon: data.rows[0],
          types: data2.rows
        });
      });
    });
  },

  page404: (req,res) => {
    res.render('404');
  }

};



module.exports = mainController;