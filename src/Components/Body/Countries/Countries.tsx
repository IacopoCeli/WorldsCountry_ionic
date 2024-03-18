import React, { useState, useEffect } from 'react';
import CountryCard, {iCountry} from './CountryCard/CountryCard';
import Filters, {iFilters} from './Filters';
import { IonLabel } from '@ionic/react';


const CountryModule = require('../../../MyModule/GetCountries');

export default function Countries() {

    const [countries, setCountries] = useState(Array<iCountry>);
    const [resultsNumber, setResNumber] = useState(0);

    useEffect(() => {
        CountryModule.GetCountries()
        .then((data: { jsonObject: { object: any[]; elementNumber: React.SetStateAction<number>; }; }) => {
            setCountries(data.jsonObject.object.map((country:any) => {
                return {
                    commonName: country.name.common,
                    officialName: country.name.official,
                    flagImg: country.flags.png,
                    flagAlt: country.flags.alt,
                    currencies: Object.getOwnPropertyNames(country.currencies).join(', '),
                    area: country.area,
                    population: country.population,
                    continent: country.continents.join(', '),
                    capital: country.capital.join(', ')
                  }
            }));

            setResNumber(data.jsonObject.elementNumber);

          })
          .catch((err: any) => console.log(err));
    }, []);

    const onFiltersChange = (filters:iFilters) => { 
    
        let {name, carSide, continent, populationMax, populationMin, currencies} = filters;
    
        CountryModule.GetCountries(name, carSide, continent, populationMax, populationMin, currencies.filter(curr => curr.label !== 'all').map(curr => curr.label).join(", "))
        .then((data: { jsonObject: { object: any[]; elementNumber: React.SetStateAction<number>; }; }) => {
            setCountries(data.jsonObject.object.map((nation:any) => {
                return {
                commonName: nation.name.common,
                officialName: nation.name.official,
                flagImg: nation.flags.png,
                flagAlt: nation.flags.alt,
                currencies: Object.getOwnPropertyNames(nation.currencies).join(', '),
                area: nation.area,
                population: nation.population,
                continent: nation.continents.join(', '),
                capital: nation.capital.join(', ')
                }
            }));

            setResNumber(data.jsonObject.elementNumber);

        })
        .catch((err: any) => console.log(err));

    };

    return (
        <>
            <Filters handleFiltersChange={onFiltersChange}/>
            <IonLabel>Results number: {resultsNumber}</IonLabel>
            {
                countries.map((country:iCountry, index:number) => {
                    return <CountryCard 
                        key = {index}
                        commonName = {country.commonName}
                        officialName = {country.officialName}
                        flagImg = {country.flagImg}
                        flagAlt = {country.flagAlt}
                        currencies = {country.currencies}
                        area = {country.area}
                        population = {country.population}
                        continent = {country.continent}
                        capital = {country.capital}/>
                })
            }
        </>
    );

}
