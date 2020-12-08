const { db } = require('../../models/user');
function updateUser(userId, serviceList) 
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$set: {"services" : serviceList}} // Update
    );
}

// function updateMeteo(userId, adress = "Paris", refreshRate = 5) 
// {

// }

exports.updateUser = updateUser;