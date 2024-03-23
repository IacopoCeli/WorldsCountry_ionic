import { IonBackButton, IonButtons, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonList, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect, useState } from "react";

const CountryModule = require('../../../../MyModule/GetCountries');

interface iCountryDetails{
    area:number, //country.area
    borders:Array<string>, //country.borders
    capital:Array<string>, //country.capital
    capitalCoordinates:{0:number, 1:number}, //country.capitalInfo.latlng
    carSide:string, //country.car.side
    isoCode:string, //country.cca3
    coatOfArmsALT:string,
    coatOfArmsIMG:string, //country.coatOfArms.png
    continents:Array<string> //country.continents
    currencies:Array<{label:string, name:string, symbol:string}> //country.currencies
    flagALT:string //country.flags.alt
    flagIMG:string //country.flags.png
    languages:Array<{label:string, name:string}> //country.lenguages
    name:{common:string, official:string} //country.name
    population:number, //country.population
    continent:string //country.region
}

export default function Details({ countries, selectedCountry }:{ countries:Array<any>, selectedCountry:string }) {

    const [worldsCountry, setWorldsCountry] = useState(Array<any>);

    const CountryDetailsFromRow = (country:any) => {

        let _currNames:Array<string> = Object.getOwnPropertyNames(country.currencies);
        let _currDetails:Array<any> = _currNames.map(curr => { return {name: country.currencies[curr].name, symbol: country.currencies[curr].symbol} });
        let _currencies = _currNames.map((curr, index) => { return { label:curr, name: _currDetails[index].name, symbol: _currDetails[index].symbol} });
        
        let _lengNames:Array<string> = Object.getOwnPropertyNames(country.languages);
        let _lengDetails:Array<any> = _lengNames.map(leng => { return {name: country.languages[leng]} });
        let _lenguages = _lengNames.map((leng, index) => { return { label:leng, name: _lengDetails[index].name } });

        return {
            area: country.area,
            borders: (country.borders) ? country.borders : [],
            capital: country.capital,
            capitalCoordinates: country.capitalInfo.latlng,
            carSide: country.car.side,
            isoCode: country.cca3,
            coatOfArmsALT: 'coat of arms',
            coatOfArmsIMG: country.coatOfArms.png,
            continents: country.continents,
            currencies: _currencies,
            flagALT: country.flags.alt,
            flagIMG: country.flags.png,
            languages: _lenguages,
            name: country.name,
            population: country.population,
            continent: country.region
        }

    }

    useEffect(() => {
        CountryModule.GetCountries()
            .then((data: { jsonObject: { object: any[]; elementNumber: React.SetStateAction<number>; }; }) => {
                setWorldsCountry(data.jsonObject.object);
            })
            .catch((err: any) => []);
    }, []);

    const [selCountry, setCountry] = useState<iCountryDetails>(CountryDetailsFromRow(countries.filter(country => country.cca3 === selectedCountry)[0]));

    return (worldsCountry.length > 0) ? (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonTitle>Details page</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">

                <img alt={selCountry.flagALT} src={selCountry.flagIMG} width="100%"/>

                <IonCardTitle>{selCountry.name.common}</IonCardTitle>
                <IonCardSubtitle class="ion-padding-bottom">{selCountry.name.official}</IonCardSubtitle>

                <IonList>
                    
                    <IonItem>
                        <IonLabel><b>ISO code:</b></IonLabel>
                        <IonLabel>{selCountry.isoCode}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Capital:</b></IonLabel>
                        <IonLabel>{selCountry.capital}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Continent:</b></IonLabel>
                        <IonLabel>{selCountry.continent}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Car side:</b></IonLabel>
                        <IonLabel>{selCountry.carSide.toUpperCase()}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Area:</b></IonLabel>
                        <IonLabel>{selCountry.area} km<sup>2</sup></IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Population:</b></IonLabel>
                        <IonLabel>{(selCountry.population > Math.pow(10, 6)) ? Math.round(selCountry.population * Math.pow(10, -4)) / 100 : selCountry.population} {(selCountry.population > Math.pow(10, 6)) ? "mln" : ""}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Lenguages:</b></IonLabel>
                        <IonLabel>{selCountry.languages.map(lang => lang.name).join(", ")}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Currencies:</b></IonLabel>
                        <IonLabel>{selCountry.currencies.map(curr => curr.name).join(", ")}</IonLabel>
                    </IonItem>

                    <IonItem>
                        <IonLabel><b>Borders:</b></IonLabel>
                        <IonList lines="none" className="ion-margin">
                        {
                            selCountry.borders.map((border, index) => {

                                let country:any = worldsCountry.filter((ele) => ele.cca3 == border)[0];

                                return (country) ? (<IonItem>
                                        <img  
                                            key={index}
                                            alt={country.flags.alt} 
                                            src={country.flags.png} 
                                            height="20px"
                                            onClick={ () => { setCountry(CountryDetailsFromRow(country)) } }
                                            style={{border: "1px solid gray", marginRight: "10px"}}/>
                                        <IonLabel>{country.name.common}</IonLabel></IonItem>    
                                    ) : (
                                        <IonItem><IonLabel key={index}>{border}</IonLabel></IonItem>
                                    )

                            })
                        }
                        </IonList>
                    </IonItem>

                </IonList>
                
            </IonContent>
        </>
    ) : <></>;
}
