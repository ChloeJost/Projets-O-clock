const express = require('express');
const session = require('express-session');


const router = require('./app/router');


const PORT = process.env.PORT || 5000;


const app = express();


app.use(express.static('integration'));


app.set('view engine', 'ejs');


app.set('views', 'app/views');

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


app.use((request, response, next)=>{
  if (!request.session.cart) {
    request.session.cart = {};
  }
  next();
});


app.use(router);



app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
