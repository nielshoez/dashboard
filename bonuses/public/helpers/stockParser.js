const { db, remove } = require('../../models/user');
const User = require ('../../models/user');
const Meteo = require("../../models/meteo");
const Stock = require('../../models/stock');

function parseStock(userId, stockData)
{
    const newStock = new Stock({
        From : stockData.StockCurrencyFrom,
        To : stockData.StockCurrencyTo
    });
    updateUserStock(userId, newStock);
}

function updateUserStock(userId, Stock)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"StockExchangeWidgets" : Stock}} // Update
    );
}

function removeStock(userId, from, to)
{
    User.findOneAndUpdate(
        { "_id": userId, "StockExchangeWidgets.From": from, "StockExchangeWidgets.To": to },
        { 
            "$set": {
                "StockExchangeWidgets.$.From": undefined,
                "StockExchangeWidgets.$.To": undefined,
            }
        },
        function(err,doc) {
    
        }
    )

}

function changeStock(userId, from, to, newFrom, newTo)
{
    User.findOneAndUpdate(
        { "_id": userId, "StockExchangeWidgets.From": from, "StockExchangeWidgets.To": to },
        { 
            "$set": {
                "StockExchangeWidgets.$.From": newFrom,
                "StockExchangeWidgets.$.To": newTo,
            }
        },
        function(err,doc) {
    
        }
    )

}

exports.parseStock = parseStock;
exports.removeStock = removeStock;
exports.changeStock = changeStock;