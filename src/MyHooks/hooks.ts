import { useState } from "react";

export function useStoredState(storageKey:string, initialState:any){
    const [state, setState] = useState(initialState);

    function setAndStoreState(state:any){
        setState(state);
        localStorage.setItem(storageKey, state);
    }

    return [state, setAndStoreState];
}