const getLeases = async (api) => {
    try {
        const data = await api.query.Broker.Leases.getValue();
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}

const getWorkload = async (api) => {
    try {
        const data = await api.query.Broker.Workload.getEntries();
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}

const getFutureWorkload = async (api) => {
    try {
        const data = await api.query.Broker.Workplan.getEntries();
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}

const getCurrentSale = async (api) => {
    try {
        const data = await api.query.Broker.SaleInfo.getValue();
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}

const getStatus = async (api) => {
    try {
        const data = await api.query.Broker.Status.getValue();
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}

const getTimeslicePeriod = async (api) => {
    try {
        const data = await api.constants.Broker.TimeslicePeriod();
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}
const getAllowedRenewals = async (api) => {
    try{
        const data = await api.query.Broker.PotentialRenewals.getEntries()
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data:error}
    }
}

const getReservations = async (api) => {
    try{
        const data = await api.query.Broker.Reservations.getValue()
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data:error}
    }
}

const getConfiguration = async (api) => {
    try{
        const data = await api.query.Broker.Configuration.getValue()
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data:error}
    }
}

export {getLeases, getWorkload, getFutureWorkload, getCurrentSale, getStatus, getTimeslicePeriod, getAllowedRenewals, getReservations, getConfiguration}