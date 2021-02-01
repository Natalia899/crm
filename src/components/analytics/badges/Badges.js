import React, { useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import Budge from './Badge'

const Budges = inject("CRMStores")(observer((props) => {
    const [budges, setBudges] = useState([])
    useEffect(() => {
        const getData = async () => {
            await props.CRMStores.getClients()
            let data = await props.CRMStores.getBudgetsData()
            await props.CRMStores.getChartsData()
            setBudges(data)
        }
        getData()
    }, [])

    return (
        <div className="budges">
            {budges && budges.map(b => <Budge budge={b} />)}
        </div>
    )
}))

export default Budges;