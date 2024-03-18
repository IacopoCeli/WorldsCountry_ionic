import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList } from '@ionic/react';

export interface iCountry{
    commonName:string,
    officialName:string,
    flagImg:string,
    flagAlt:string,
    currencies:string,
    area:number,
    population:number,
    continent:string,
    capital:string
}

function CountryCard(country:iCountry) {
  return (
    <div style={{maxWidth: "500px", margin: "0 auto"}}>
        <IonCard>

            <img alt={country.flagAlt} src={country.flagImg} width="100%"/>

            <IonCardHeader>
                <IonCardTitle>{country.commonName}</IonCardTitle>
                <IonCardSubtitle>{country.officialName}</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
                <IonList>
                    <IonItem>
                        <IonLabel><b>Currencies:</b></IonLabel>
                        <IonLabel>{country.currencies}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel><b>Area:</b></IonLabel>
                        <IonLabel>{country.area} km<sup>2</sup></IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel><b>population:</b></IonLabel>
                        <IonLabel>{Math.round(country.population * Math.pow(10, -4)) / 100} mln</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel><b>Continent:</b></IonLabel>
                        <IonLabel>{country.continent}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel><b>Capital:</b></IonLabel>
                        <IonLabel>{country.capital}</IonLabel>
                    </IonItem>
                </IonList>
            </IonCardContent>

        </IonCard>
    </div>
  );
}
export default CountryCard;