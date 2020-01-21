const User = require('../models/user');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const userController = {

  signupPage: (req, res) => {
    res.render('signup');
  },

  signupAction: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (user) {
        return res.render('signup', {
          error: "Cet email est déjà utilisé par un utilisateur."
        });
      }    
      if (!emailValidator.validate(req.body.email)) {
        return res.render('signup', {
          error: "Cet email n'est pas valide."
        });
      }

      if (req.body.password !== req.body.passwordConfirm) {
        return res.render('signup', {
          error: "La confirmation du mot de passe ne correspond pas."
        });
      }

      let newUser = new User();
      newUser.setFirstName(req.body.firstname);
      newUser.setLastName(req.body.lastname);
      newUser.setEmail(req.body.email);
      newUser.setStatus(1);
      const encryptedPwd = bcrypt.hashSync(req.body.password, 10);
      newUser.setPassword(encryptedPwd);
      await newUser.save()
      res.redirect('/login');
    } catch (err) {
      res.status(500).send(err);
    }  
  },

  loginPage: (req, res) => {
    res.render('login');
  },

  loginAction: async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        return res.render('login',{
          error: "Cet email n'existe pas."
        });
      }
      const validPwd = bcrypt.compareSync(req.body.password, user.getPassword() );
      if (!validPwd) {
        return res.render('login',{
          error: "Ce n'est pas le bon mot de passe."
        });
      }
      req.session.user = user;

      delete req.session.user.password;

      return res.redirect('/');

    } catch (err) {
      res.status(500).send(err);
    }
  },

  disconnect: (req, res) => {
    req.session.user = false;
    return res.redirect('/');
  },

  profilePage: (req, res) => {
    if(!req.session.user) {
      return res.redirect('/login');
    }
    
    res.render('profile', {
      user: req.session.user
    });
  }

};

module.exports = userController;