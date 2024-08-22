//Dependencies
import React, { createContext, useState, useEffect, useContext } from 'react';

//Import Context
import ApiContext from './ApiConnect'

//Import API Calls
import { getParas } from './../Api/relay'

const RelayContext = createContext();
export default RelayContext;

export function Relay ({ children }) {

    const { ksmApi, ksmClient } = useContext(ApiContext)

    //STATE
    const [paras, setParas] = useState(null);
    const [block, setBlock] = useState(null)


    useEffect(() => {
        const getStorage = async () => {
            const _paras = await getParas(ksmApi)
            setParas(_paras)
        }

        if (ksmApi) {
            getStorage();
        }

    },[ksmApi])

    useEffect(() => {
        let subscription;

        if (ksmClient){
          subscription = ksmClient.finalizedBlock$.subscribe((block) => {
            setBlock(block.number)
          });
        }
    
        return () => {
            if (subscription){
                subscription.unsubscribe();
            }
        };
    
    },[ksmClient])

    return (
        <RelayContext.Provider value={{ paras, block }}>
            { children }
        </RelayContext.Provider>
    );
}