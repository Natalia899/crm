import React from 'react';
import { observer, inject } from 'mobx-react'



const SalesFromChart = inject("CRMStores", "UpdateStores")(observer((props) => {
    return (
        <div>
        chart
        </div>
    )
}))

export default SalesFromChart;