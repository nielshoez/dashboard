const { db } = require('../../models/user');
const User = require ('../../models/user');
const Meteo = require("../../models/meteo");

function parseCovid(userId, covidData)
{
    const newMeteo = new Meteo({
        address : covidData.locationCorona,
    });
    updateUserCorona(userId, newMeteo);
}

function updateUserCorona(userId, covid)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"coronaWidgets" : covid}} // Update
    );
}

function parseCovidTest(userId, covidData)
{
    const newMeteo = new Meteo({
        address : covidData.locationCoronaTest,
    });
    updateUserCoronaTest(userId, newMeteo);
}

function updateUserCoronaTest(userId, covid)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"coronaWidgetsTest" : covid}} // Update
    );
}

function removeCorona(userId, currentCountry)
{
    User.findOneAndUpdate(
        { "_id": userId, "coronaWidgets.address": currentCountry },
        { 
            "$set": {
                "coronaWidgets.$.address": undefined
            }
        },
        function(err,doc) {
    
        }
    )

}

function changeCorona(userId, newLocation, currentCountry)
{
    User.findOneAndUpdate(
        { "_id": userId, "coronaWidgets.address": currentCountry },
        { 
            "$set": {
                "coronaWidgets.$.address": newLocation
            }
        },
        function(err,doc) {
    
        }
    )

}

function removeCoronaTest(userId, currentCountry)
{
    User.findOneAndUpdate(
        { "_id": userId, "coronaWidgetsTest.address": currentCountry },
        { 
            "$set": {
                "coronaWidgetsTest.$.address": undefined
            }
        },
        function(err,doc) {
    
        }
    )

}

function changeCoronaTest(userId, newLocation, currentCountry)
{
    User.findOneAndUpdate(
        { "_id": userId, "coronaWidgetsTest.address": currentCountry },
        { 
            "$set": {
                "coronaWidgetsTest.$.address": newLocation
            }
        },
        function(err,doc) {
    
        }
    )

}

exports.parseCovid = parseCovid;
exports.removeCorona = removeCorona;
exports.changeCorona = changeCorona;
exports.removeCoronaTest = removeCoronaTest;
exports.changeCoronaTest = changeCoronaTest;
exports.parseCovidTest = parseCovidTest;