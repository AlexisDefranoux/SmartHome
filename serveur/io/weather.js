const https = require('https');
const axios = require('axios');

function doRequest(options) {
	return new Promise ((resolve, reject) => {
		let req = https.request(options);

		req.on('response', res => {
		resolve(res);
		});

		req.on('error', err => {
		reject(err);
		});
	}); 
}

async function createalerte(db) {

}

// A actualiser tout les 24h
async function transformConsigne(db, app) {
    try {
		// const url = "https://www.prevision-meteo.ch/services/json/lat=43.586007lng=7.105190";
		// const resp = await axios.get(url);
		// const myJsonWeather = resp.data;

		var myJsonWeather = {"fcst_day_0":{"tmin":12,"tmax":21},"fcst_day_1":{"tmin":18, "tmax":28}};
        //var myJsonWeather = {"fcst_day_0":{"tmin":18,"tmax":28},"fcst_day_1":{"tmin":12, "tmax":21}};
        //var myJsonWeather = {"fcst_day_0":{"tmin":18,"tmax":25},"fcst_day_1":{"tmin":18, "tmax":25}};
		
    	var tmin0 = myJsonWeather.fcst_day_0.tmin;
    	var tmin1 = myJsonWeather.fcst_day_1.tmin;
    	var tmax1 = myJsonWeather.fcst_day_1.tmax;
    	var tmax0 = myJsonWeather.fcst_day_0.tmax;

    	var moy0 = (tmin0 + tmax0)/2;
    	var moy1 = (tmin1 + tmax1)/2;
		console.log("Temperature moyenne d'aujourd'hui : "+moy0);
		console.log("Temperature moyenne de demain : "+moy1);
		console.log("Difference : "+Math.abs(moy0-moy1));
    	if((moy1 - moy0) > 5){
    		try {
	        	db.query('INSERT INTO mishap values(NULL, "Une vague de chaleur arrive. Les radiateurs anticipe cela en diminuant les radiateurs de 2 degrés.  [W]", 52, NOW(), ?, ?, ?, NULL, NOW(), NULL)', [3, 2, 6]);
    		} catch (err){
    			console.error(err);
			}
			app.transformConsigne=-2;
    		return -2;

    	}else if((moy0 - moy1) > 5){
    		try {
	        	db.query('INSERT INTO mishap values(NULL, "Une vague de froid arrive. Les radiateurs anticipe cela en augmentant les radiateurs de 2 degrés.  [W]", 52, NOW(), ?, ?, ?, NULL, NOW(), NULL)', [3, 2, 6]);
    		} catch (err){
    			console.error(err);
			}
			app.transformConsigne=2;
    		return 2;
    	}else{
    		try {
		    	db.query('UPDATE mishap SET idState = 3 WHERE description like ?', ['%[W]%']);
			} catch (err){
				console.error(err);
			}
			app.transformConsigne=0;
    		return 0;
    	}

    } catch(err) {
		console.error(err);
		app.transformConsigne=0;
        return 0;
    }
}
module.exports.transformConsigne = transformConsigne;