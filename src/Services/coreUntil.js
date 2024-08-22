export const coreUntil = (ar, l, r, t) =>{
    let until = []
    //Leases. These are part of the migration.
    until = l.map(lease => {
        return {para:lease.task, until: lease.until}
    })

    //Reservations. These are system chains.
    r.map(item => {
        until.push({para:item[0].assignment.value, until: "r"}) 
    })

    //Renewals. All other parachains currently having a core.
    ar.map(item => {
        if(item.keyArgs[0].when >= t)
        until.push({para: item.value.completion.value[0].assignment.value, until: item.keyArgs[0].when})
    })

    return until
} 