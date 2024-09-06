//Import Dependencies
import React, { useState, useEffect, useContext } from 'react';

import CoretimeContext from './Context/Coretime.js'
import RelayContext from './Context/Relay.js'
import ApiContext from './Context/ApiConnect.js'

import Home from './Pages/Home.js'

import { coreUntil } from './Services/coreUntil.js'

const App = () => {

  const { leases, status, sale, workload, allowedRenewals, reservations } = useContext(CoretimeContext)
  const { paras } = useContext(RelayContext)

  const [untilList, setUntilList] = useState([])
  const [filter, setFilter] = useState(null)

  const [serchList, setSearchList] = useState(null)
  
  useEffect(() => {
    if (paras) {
      const list = paras.data.map(para => para.keyArgs[0]).sort((a, b) => a - b)
      setSearchList({kusama: list})
    }
  },[paras])
  
  useEffect(() => {
    if (allowedRenewals && leases && reservations) {
      console.log("TUTU", allowedRenewals)
      const _untilList = coreUntil(allowedRenewals.data, leases.data, reservations.data, status.data.last_committed_timeslice)
      setUntilList(_untilList)
    }
  },[allowedRenewals, leases, reservations])
  return (
    <Home paras={serchList} workload={workload} untilList={untilList} sale={sale}/>
  );
}

export default App;
