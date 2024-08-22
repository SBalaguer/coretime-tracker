//Dependencies
import React, { createContext, useState, useEffect } from 'react';
import { createClient } from "polkadot-api"
import { getWsProvider } from "polkadot-api/ws-provider/web"
import { ksm } from "@polkadot-api/descriptors"
import { ksmcoretime } from "@polkadot-api/descriptors"

const ApiContext = createContext();
export default ApiContext;

export function ApiConnect ({ children }) {
    
    const [ksmApi, setKsmApi] = useState(null)
    const [ksmCoretimeApi, setKsmCoretimeApi] = useState(null)
    const [ksmClient, setKsmClient] = useState(null)
    const [ksmCoretimeClient, setKsmCoretimeClient] = useState(null)

    useEffect(() =>{
        const startKsmApi = async () => {
            await initKsm();
        }

        const startKsmCoretimeApi = async () => {
            await initKsmCoretime();
        }

        if(!ksmApi){
            startKsmApi();
        }
        if(!ksmCoretimeApi){
            startKsmCoretimeApi();
        }

    })

    const initKsm = async () => {
        const clientKsm = createClient(getWsProvider("wss://rpc.ibp.network/kusama"))
        setKsmClient(clientKsm)
        const _ksmApi = await clientKsm.getTypedApi(ksm)
        setKsmApi(_ksmApi)
    }

    const initKsmCoretime = async () => {
        const clientKsmCoretime = createClient(getWsProvider("wss://kusama-coretime-rpc.polkadot.io"))
        setKsmCoretimeClient(clientKsmCoretime)
        const _ksmCoretimeApi = await clientKsmCoretime .getTypedApi(ksmcoretime)
        setKsmCoretimeApi(_ksmCoretimeApi)
    }

    return (
        <ApiContext.Provider value={{ksmApi, ksmCoretimeApi, ksmClient, ksmCoretimeClient}}>
            { children }
        </ApiContext.Provider>
    );
}