import { IonContent } from "@ionic/react";

import Countries from './Countries/Countries';

export default function Body() {

    return (
        <>
        <IonContent className="ion-padding">
            <Countries />
        </IonContent>
        </>
    );

}
