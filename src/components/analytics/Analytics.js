import React from 'react';
import { observer, inject } from 'mobx-react'
import TopEmployeesChart from './charts/TopEmployeesChart'
import Budges from './badges/Badges'
//import {ClientAcquisition, SalesFromChart, salesByCountries, TopEmployeesChart} from './charts';


const Analytics = inject("CRMStores", "UpdateStores")(observer((props) => {
    return (
        <>
            <TopEmployeesChart />
           <Budges />
        </>
    )
}))
export default Analytics;