const url = 'https://restcountries.com/v3.1/independent?status=true';

async function _GetCountries(){

    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'it-IT,it;q=0.8,en-US;q=0.5,en;q=0.3',
            'Connection': 'keep-alive',
            'Host': 'restcountries.com',
            'Origin': '*',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(err => {
        console.log(err);
        return '[]';
    })

}

function MakeResponseJsonMessage(status, message, jsonObject = {}){

    return {
        status: status,
        message: message,
        jsonObject: {
            elementNumber: jsonObject.length ? jsonObject.length : 0,
            object: jsonObject
        }
    }
}


async function GetCountries(_name = '', _carSide = '', _continent = '', _populationMax = '', _populationMin = '', _currencies = ''){

    return _GetCountries()
    .then(data => {

        let name = _name ? _name : '';
        let carSide = _carSide.toUpperCase() !== 'BOTH' ? _carSide : '';
        let continent = _continent ? 
                            (_continent.split('').map((c, index, array) => c = (!index || array[index-1] === ' ') ? c.toUpperCase() : 
                            c.toLowerCase())).join('') : ''; // Capitalizzo ogni parola di una frase
        let populationMax = _populationMax ? _populationMax : '';
        let populationMin = _populationMin ? _populationMin : '';
        let currencies = (_currencies) ? _currencies.split(';') : '';

        return MakeResponseJsonMessage(1, '', data.filter(country => {

            return (country.name.common.toUpperCase().includes(name.toUpperCase()) &&
                    ((!carSide) || (country.car.side.toUpperCase() === carSide.toUpperCase())) &&
                    ((!continent) || (country.continents.filter(ele => ele.toUpperCase().includes(continent.toUpperCase())).length > 0)) &&
                    ((!populationMax) || (country.population <= parseInt(populationMax))) &&
                    ((!populationMin) || (country.population >= parseInt(populationMin))) &&
                    ((!currencies) || (Object.getOwnPropertyNames(country.currencies).filter((currency) => currencies.includes(currency)).length > 0)))

        }))

    })
    .catch(err => MakeResponseJsonMessage(0, err));

}

async function GetWorldCurrencies(){

    return _GetCountries()
    .then(data => {

        let _currencies = [];

        data.forEach(country => {
            Object.getOwnPropertyNames(country.currencies).forEach((currency) => {

                let c = {
                    name: country.currencies[currency].name,
                    label: currency,
                    symbol: country.currencies[currency].symbol ? country.currencies[currency].symbol : 'n.a.'
                };
                
                console.log(c);

                if(_currencies.filter(ele => ele.label === c.label).length === 0) _currencies.push(c);

            })
        });

        return MakeResponseJsonMessage(1, '', _currencies);

    });
}

export { GetCountries, GetWorldCurrencies }