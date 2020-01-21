
const express = require('express');

const app = express();


const cityTime = require('./my_modules/cityTime');


const port = 3000;

app.get('/', (request, response) => {
    response.sendFile('views/index.html', {root: '.'});
});


app.get('/city/:cityName', (request, response) => {
    let theCurrentTime = cityTime.getCityTime(request.params.cityName);
    
    if (!theCurrentTime) {
        response.status(404);
        response.send('Ville non trouvée');
        return;
    }

    response.send("La date et l'heure actuelles de " + theCurrentTime.city + " est " + theCurrentTime.format("LLLL")); // m
 
    
});

app.listen(port, () => console.log('Server listening'));