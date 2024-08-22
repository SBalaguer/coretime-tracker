//Dependencies
import React, { createContext, useState, useEffect, useContext } from 'react';

//Import Context
import ApiContext from './ApiConnect'

//Import API Calls
import { getLeases, getCurrentSale, getStatus, getWorkload, getFutureWorkload, getTimeslicePeriod, getAllowedRenewals, getReservations, getConfiguration } from './../Api/coretime'

const CoretimeContext = createContext();
export default CoretimeContext;

export function Coretime ({ children }) {

    const { ksmCoretimeApi } = useContext(ApiContext)

    //STATE
    const [leases, setLeases] = useState(null);
    const [status, setStatus] = useState(null);
    const [sale, setSale] = useState(null);
    const [workload, setWorkload] = useState(null);
    const [fworkload, setFworkload] = useState(null);
    const [timeslicePeriod, setTimeslicePeriod] = useState(null);
    const [allowedRenewals, setAllowedRenewals] = useState(null);
    const [reservations, setReservations] = useState(null);
    const [config, setConfig] = useState(null)


    useEffect(() => {
        const getStorage = async () => {
            const _leases = await getLeases(ksmCoretimeApi)
            setLeases(_leases)
            
            const _status = await getStatus(ksmCoretimeApi)
            setStatus(_status)

            const _sale = await getCurrentSale(ksmCoretimeApi)
            setSale(_sale)

            const _workload = await getWorkload(ksmCoretimeApi)
            setWorkload(_workload)

            const _fworkload = await getFutureWorkload(ksmCoretimeApi)
            setFworkload(_fworkload)

            const _timeslicePeriod = await getTimeslicePeriod(ksmCoretimeApi)
            setTimeslicePeriod(_timeslicePeriod)
            
            const _allowedRenewals = await getAllowedRenewals(ksmCoretimeApi)
            setAllowedRenewals(_allowedRenewals)

            const _reservations = await getReservations(ksmCoretimeApi)
            setReservations(_reservations)

            const _config = await getConfiguration(ksmCoretimeApi)
            setConfig(_config)
        }

        if (ksmCoretimeApi) {
            getStorage();
        }

    },[ksmCoretimeApi])


    return (
        <CoretimeContext.Provider value={{leases, status, sale, workload, fworkload, timeslicePeriod, allowedRenewals, reservations, config}}>
            { children }
        </CoretimeContext.Provider>
    );
}