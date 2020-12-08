const coronaParser = require('./covidParser');
const meteoParser = require('./meteoParser');
const stockParser = require('./stockParser');
const wordParser = require('./wordParser');

function create(userId, body)
{
    if (body.currentCityClose)
        meteoParser.removeMeteo(userId, body.currentCityClose);
    if (body.currentairClose)
        meteoParser.removeAir(userId, body.currentairClose);
    if (body.EditLocationMeteo && body.currentCity) {
        meteoParser.changeMeteo(userId, body.EditLocationMeteo , body.currentCity);
    }
    if (body.EditLocationAir && body.currentCityAir) {
        meteoParser.changeAir(userId, body.EditLocationAir , body.currentCityAir);
    }
    if (body.airQualityLocation) {
        meteoParser.parseMeteoAir(userId, body);
    }
    if (body.locationMeteo) {
        meteoParser.parseMeteo(userId, body);
    }
    if (body.locationCorona) {
        coronaParser.parseCovid(userId, body);
    }
    if (body.coronaClose)
        coronaParser.removeCorona(userId, body.coronaClose);
    if (body.EditCorona && body.currentCountry) {
        coronaParser.changeCorona(userId, body.EditCorona, body.currentCountry);
    }
    if (body.locationCoronaTest) {
        console.log(body.locationCoronaTest);
        coronaParser.parseCovidTest(userId, body);
    }
    if (body.coronaTestClose)
        coronaParser.removeCoronaTest(userId, body.coronaTestClose);
    if (body.EditcoronaTest && body.currentCountry) {
        coronaParser.changeCoronaTest(userId, body.EditcoronaTest, body.currentCountry);
    }
    if (body.StockCurrencyFrom && body.StockCurrencyTo)
    {
        stockParser.parseStock(userId, body);
    }
    if (body.word)
    {
        wordParser.parseWord(userId, body);
    }
    if (body.wordClose) {
        wordParser.removeWord(userId, body.wordClose);
    }
    if (body.Editword && body.currentWord) {
        wordParser.changeWord(userId, body.Editword, body.currentWord);
    }

    if (body.wordPron)
    {
        wordParser.parseWordPron(userId, body);
    }
    if (body.wordPronClose) {
        wordParser.removeWordPron(userId, body.wordPronClose);
    }
    if (body.EditwordPron && body.currentWordPron) {
        wordParser.changeWordPron(userId, body.EditwordPron, body.currentWordPron);
    }
}

exports.create = create;