import React from 'react';
import { observer, inject } from 'mobx-react'



const ClientAcquisition = inject("CRMStores", "UpdateStores")(observer((props) => {
    return (
        <div>
        chart
        </div>
    )
}))

export default ClientAcquisition;