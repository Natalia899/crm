import React from 'react';
import { observer, inject } from 'mobx-react'
import TopEmployeesChart from './charts/TopEmployeesChart'
import SalesByCountries from './charts/SalesByCountries'
import SalesFromChart from './charts/SalesFromChart'
import ClientAcquisition from './charts/ClientAcquisition'
import Budges from './badges/Badges'
//import {ClientAcquisition, SalesFromChart, salesByCountries, TopEmployeesChart} from './charts';


const Analytics = inject("CRMStores", "UpdateStores")(observer((props) => {
    return (
        <>
           <Budges />
            <SalesByCountries />
            <TopEmployeesChart />
            <SalesFromChart />
            <ClientAcquisition />
        </>
    )
}))
export default Analytics;