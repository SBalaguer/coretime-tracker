const getParas = async (api) => {
    try {
        const data = await api.query.Registrar.Paras.getEntries()
        return {status: "success", data}
    } catch (error) {
        return {status: "error", data: error}
    }
}

export { getParas }