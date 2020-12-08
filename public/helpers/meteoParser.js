const { db } = require('../../models/user');
const User = require ('../../models/user');
const Meteo = require("../../models/meteo");

function parseMeteo(userId, meteoData)
{
    const newMeteo = new Meteo({
        address : meteoData.locationMeteo,
        refreshRate: meteoData.refreshMeteo,
    });
    updateUserMeteo(userId, newMeteo);
}

function parseMeteoAir(userId, meteoData)
{
    const newMeteo = new Meteo({
        address : meteoData.airQualityLocation,
    });
    updateUserMeteoYear(userId, newMeteo);
}

function updateUserMeteoYear(userId, newMeteoYear)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"meteoYearWidgets" : newMeteoYear}} // Update
    );
}

function updateUserMeteo(userId, newMeteo)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"meteoWidgets" : newMeteo}} // Update
    );
}

function changeMeteo(userId, newLocation, currentCity)
{
    User.findOneAndUpdate(
        { "_id": userId, "meteoWidgets.address": currentCity },
        { 
            "$set": {
                "meteoWidgets.$.address": newLocation
            }
        },
        function(err,doc) {
    
        }
    );

}

function changeAir(userId, newLocation, currentCity)
{
    User.findOneAndUpdate(
        { "_id": userId, "meteoYearWidgets.address": currentCity },
        { 
            "$set": {
                "meteoYearWidgets.$.address": newLocation
            }
        },
        function(err,doc) {
    
        }
    );

}

function removeMeteo(userId, currentCity)
{
    User.findOneAndUpdate(
        { "_id": userId, "meteoWidgets.address": currentCity },
        { 
            "$set": {
                "meteoWidgets.$.address": undefined
            }
        },
        function(err,doc) {
    
        }
    )

}

function removeAir(userId, currentCity)
{
    User.findOneAndUpdate(
        { "_id": userId, "meteoYearWidgets.address": currentCity },
        { 
            "$set": {
                "meteoYearWidgets.$.address": undefined
            }
        },
        function(err,doc) {
    
        }
    )

}
exports.parseMeteo = parseMeteo;
exports.changeMeteo = changeMeteo;
exports.changeAir = changeAir;
exports.removeMeteo = removeMeteo;
exports.removeAir = removeAir;
exports.parseMeteoAir = parseMeteoAir;