import React from 'react';
import { observer, inject } from 'mobx-react'



const TopEmployeesChart = inject("CRMStores", "UpdateStores")(observer((props) => {
    return (
        <div>
        chart
        </div>
    )
}))

export default TopEmployeesChart;
