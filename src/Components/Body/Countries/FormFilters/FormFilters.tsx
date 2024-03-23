import { useState } from "react";
import { IonButton, IonIcon, IonInput, IonItem, IonLabel, IonRange, IonSelect, IonSelectOption, useIonToast } from "@ionic/react";
import { useEffect } from "react";
import { RangeValue } from "@ionic/core";
import { iFilters } from '../Filters';
import { reloadOutline } from "ionicons/icons";

const CountryModule = require('../../../../MyModule/GetCountries');

    export interface iCurrency{
        name:string,
        label:string,
        symbol:string,
        selected:boolean
    }

export default function FormFilters({ handleFiltersChange, _name, _carSide, _continent, _populationMax, _populationMin, _selCurrencies }:
    {_name:string,
    _carSide:string,
    _continent:string,
    _populationMax:number,
    _populationMin:number,
    _selCurrencies:Array<iCurrency>, 
    handleFiltersChange: (filters:iFilters) => void}) {

    const [country, setCountry] = useState<string | null | undefined>(_name);
    const [continent, setContinent] = useState<string | null | undefined>(_continent);
    const [carSide, setCarSide] = useState(_carSide);
    const [rangeVal, setLimit] = useState<RangeValue>({lower: _populationMin, upper: _populationMax});
    const [selCurrencies, setSelCurrencies] = useState(_selCurrencies);
    const [currencies, setCurrencies] = useState(Array<iCurrency>);

    useEffect(() => {
        CountryModule.GetWorldCurrencies()
        .then((data: { jsonObject: { object: iCurrency[]; }; }) => {
            console.log(data.jsonObject.object);
            setCurrencies(data.jsonObject.object.sort((a:iCurrency, b:iCurrency) => (a.label > b.label) ? 1 : -1))
        })
        .catch((err: any) => setCurrencies([]))
    
    }, [])

    useEffect(() => {
        handleFiltersChange({
            name: (country as string),
            carSide: carSide,
            continent: (continent as string),
            populationMax: (rangeVal as {lower: number, upper: number}).upper * Math.pow(10,6),
            populationMin: (rangeVal as {lower: number, upper: number}).lower * Math.pow(10,6),
            currencies: selCurrencies
        })
    }, [country, continent, carSide, rangeVal, selCurrencies])

    const [presentToast] = useIonToast();

    const UpdatedFilterConfirmation = (message:string) => {
        presentToast({
            message: message,
            duration: 1500
        })
    }

    const ClearFilters = () => {
        setCountry('');
        setContinent('');
        setCarSide('Both');
        setLimit({lower: 0, upper: 0})
        setSelCurrencies([]);
        UpdatedFilterConfirmation('Filters cleaned!');
    }

    return (
        <>

            <IonButton 
                className = "ion-margin-bottom"
                size = "default"
                expand = "block" 
                onClick = {() => ClearFilters()}
                color = "light">
                <IonIcon icon={reloadOutline} slot="start" />
                Clear filters
            </IonButton>

            <IonItem className="ion-margin-bottom">
                <IonInput 
                    label="Country name" 
                    labelPlacement="floating" 
                    placeholder="Italy"
                    value={country}
                    onIonChange={({detail}) => { setCountry(detail.value); 
                                                    UpdatedFilterConfirmation(`Country name filter updated: ${detail.value}`)}}></IonInput>
            </IonItem>
            <IonLabel
                color="medium"
                hidden={country === ''}>
                Seraching countries that contains in its name {country}
            </IonLabel>

            <IonLabel style={{margin: "50px"}}></IonLabel>

            <IonItem className="ion-margin-bottom ion-margin-upper">
                <IonInput 
                        label="Continent name" 
                        labelPlacement="floating" 
                        placeholder="Europe"
                        value={continent}
                        onIonChange={({detail}) => { setContinent(detail.value); 
                                                        UpdatedFilterConfirmation(`Continent filter updated: ${detail.value}`)}}></IonInput>
            </IonItem>
            <IonLabel
                color="medium"
                hidden={continent === ''}>
                Seraching countries in {continent}
            </IonLabel>

            <IonLabel style={{margin: "50px"}}></IonLabel>

            <IonItem className="ion-margin-bottom ion-margin-upper">
                <IonSelect 
                    label="Car side" 
                    selected-text={carSide}
                    value={carSide}
                    onIonChange={({detail}) => { setCarSide(detail.value); 
                                                    UpdatedFilterConfirmation(`Car side filter updated: ${detail.value}`)}}>
                    <IonSelectOption value="Both">Both</IonSelectOption>
                    <IonSelectOption value="Left">Left</IonSelectOption>
                    <IonSelectOption value="Right">Right</IonSelectOption>
                </IonSelect>
            </IonItem>
            <IonLabel
                color="medium"
                hidden={carSide === 'Both'}>
                Seraching countries where the car side is {carSide}
            </IonLabel>

            <IonLabel style={{margin: "50px"}}></IonLabel>

            <IonItem className="ion-margin-bottom ion-margin-upper">
                <IonSelect 
                    aria-label="Currencies" 
                    placeholder="Select currencies for filtering..." 
                    multiple={true} 
                    value={selCurrencies}
                    onIonChange={({ detail }) => { setSelCurrencies((detail.value as Array<iCurrency>)); 
                                                    UpdatedFilterConfirmation(`Currencies filter updates: ${(detail.value as Array<iCurrency>).map(ele => ele.label).join(", ")}`)}}>
                    {
                        currencies.map((ele, index) => {
                            return <IonSelectOption key={index} value={ele}>{ele.label}</IonSelectOption>
                        })
                    }
                </IonSelect>
            </IonItem>
            <IonLabel
                color="medium"
                hidden={selCurrencies.length === 0}>
                Searching countries with that currencies: {selCurrencies.map(ele => ele.label).join(", ")}
            </IonLabel>
            
            <IonLabel style={{margin: "50px"}}></IonLabel>

            <IonItem className="ion-margin-bottom ion-margin-upper">
                <IonRange
                    dualKnobs={true}
                    value={rangeVal}
                    max={1500}
                    onIonChange={({ detail }) => { setLimit(detail.value); 
                                                    UpdatedFilterConfirmation(`Population filter updates: from ${(detail.value as {lower: number, upper: number}).lower} to ${(detail.value as {lower: number, upper: number}).upper}`)}}>
                </IonRange>
            </IonItem>
            <IonLabel
                color="medium"
                hidden={(rangeVal as {lower: number, upper: number}).lower === 0 && (rangeVal as {lower: number, upper: number}).upper === 0}>
                Seraching countries with population between {(rangeVal as {lower: number, upper: number}).lower} and {(rangeVal as {lower: number, upper: number}).upper} milion of person
            </IonLabel>
            
        </>
    );
}
