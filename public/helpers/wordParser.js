const { db } = require('../../models/user');
const User = require ('../../models/user');
const Word = require("../../models/word");

function parseWord(userId, body)
{
    const newWord = new Word({
        Word : body.word,
    });
    updateUserWords(userId, newWord);
}

function updateUserWords(userId, word)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"OxfordDefinitionWidgets" : word}} // Update
    );
}

function removeWord(userId, currentWord)
{
    User.findOneAndUpdate(
        { "_id": userId, "OxfordDefinitionWidgets.Word": currentWord },
        { 
            "$set": {
                "OxfordDefinitionWidgets.$.Word": undefined
            }
        },
        function(err,doc) {
    
        }
    )

}

function changeWord(userId, newWord, currentWord)
{
    User.findOneAndUpdate(
        { "_id": userId, "OxfordDefinitionWidgets.Word": currentWord },
        { 
            "$set": {
                "OxfordDefinitionWidgets.$.Word": newWord
            }
        },
        function(err,doc) {
    
        }
    )

}

function parseWordPron(userId, body)
{
    const newWord = new Word({
        Word : body.wordPron,
    });
    updateUserWordsPron(userId, newWord);
}

function updateUserWordsPron(userId, word)
{
    db.collection('users').updateOne(
        { "_id": userId}, // Filter
        {$push: {"OxfordPronWidgets" : word}} // Update
    );
}

function removeWordPron(userId, currentWord)
{
    User.findOneAndUpdate(
        { "_id": userId, "OxfordPronWidgets.Word": currentWord },
        { 
            "$set": {
                "OxfordPronWidgets.$.Word": undefined
            }
        },
        function(err,doc) {
    
        }
    )

}

function changeWordPron(userId, newWord, currentWord)
{
    User.findOneAndUpdate(
        { "_id": userId, "OxfordPronWidgets.Word": currentWord },
        { 
            "$set": {
                "OxfordPronWidgets.$.Word": newWord
            }
        },
        function(err,doc) {
    
        }
    )

}

exports.parseWord = parseWord;
exports.removeWord = removeWord;
exports.changeWord = changeWord;
exports.parseWordPron = parseWordPron;
exports.removeWordPron = removeWordPron;
exports.changeWordPron = changeWordPron;