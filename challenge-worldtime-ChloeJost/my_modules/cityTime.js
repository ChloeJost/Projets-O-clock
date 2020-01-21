const capitalCities = require('./capitalCities'); 

const moment = require('moment-timezone'); 

moment.locale('fr'); 

const cityTime = {
    getCityTime: (cityName) => {
        let theRightCapital = capitalCities.filter((city) => city.name.toLowerCase() === cityName.toLowerCase()).pop();

        if (!theRightCapital) {
            return false;
        }
        let theRightTimezone = theRightCapital.tz;

        let theMoment = moment().tz(theRightTimezone);
        theMoment.city = theRightCapital.name;
        return theMoment;
    }
};

module.exports = cityTime;