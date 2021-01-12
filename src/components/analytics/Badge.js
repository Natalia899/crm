import React from 'react';
import { observer, inject } from 'mobx-react'

const Budge = inject("CRMStores", "UpdateStores")(observer((props) => {
    return (
        <div>
        chart
        </div>
    )
}))

export default Budge;