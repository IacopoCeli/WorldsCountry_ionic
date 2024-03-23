import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { useState } from "react";
import { filterCircle } from "ionicons/icons";
import FormFilters from "./FormFilters/FormFilters";
import { iCurrency } from './FormFilters/FormFilters';

export interface iFilters{
    name:string,
    carSide:string,
    continent:string,
    populationMax:number,
    populationMin:number,
    currencies:Array<iCurrency>
  }

export default function Filters({ handleFiltersChange }:{ handleFiltersChange: (filters:iFilters) => void}) {
    
    const [isOpen, setIsOpen] = useState(false);

    const [filters, setFilters] = useState<iFilters>({
        name:'',
        carSide:'Both',
        continent:'',
        populationMax:0,
        populationMin:0,
        currencies:[]
    });

    const onFiltersChange = (filters:iFilters) => {
        setFilters(filters);
        handleFiltersChange(filters);
    }

    return (
        <>
            <IonButton 
                className="ion-margin-bottom"
                size = "default"
                expand="block" 
                onClick={() => setIsOpen(true)}>
                <IonIcon icon={filterCircle} slot="start" />
                Filters
            </IonButton>

            <IonModal isOpen={isOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Filters</IonTitle>
                        <IonButtons slot="end">
                            <IonButton 
                                onClick={() => setIsOpen(false)}>
                                Confirm
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <FormFilters 
                        _name = {filters.name}
                        _continent = {filters.continent}
                        _carSide = {filters.carSide}
                        _populationMax= {filters.populationMax * Math.pow(10, -6)}
                        _populationMin = {filters.populationMin * Math.pow(10, -6)}
                        _selCurrencies = {filters.currencies}
                        handleFiltersChange={onFiltersChange} />
                </IonContent>
            </IonModal>
        </>
    );
}
