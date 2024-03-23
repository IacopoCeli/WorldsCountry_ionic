import React, { useState, useEffect } from 'react';
import CountryCard, {iCountry} from './CountryCard/CountryCard';
import Filters, {iFilters} from './Filters';
import { IonLabel, IonNavLink } from '@ionic/react';
import Details from './Details/Details';


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
                    capital: country.capital.join(', '),
                    cca3: country.cca3,
                    rowObj: data.jsonObject.object
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
                    capital: country.capital.join(', '),
                    cca3: country.cca3,
                    rowObj: data.jsonObject.object
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
                    return <IonNavLink key = {index} routerDirection="forward" component={() => <Details countries={country.rowObj} selectedCountry={country.cca3}/>}>
                        <CountryCard 
                        key = {index}
                        commonName = {country.commonName}
                        officialName = {country.officialName}
                        flagImg = {country.flagImg}
                        flagAlt = {country.flagAlt}
                        currencies = {country.currencies}
                        area = {country.area}
                        population = {country.population}
                        continent = {country.continent}
                        capital = {country.capital}
                        cca3 = {country.cca3}
                        rowObj = {country.rowObj}/>
                    </IonNavLink>
                })
            }
        </>
    );

}
