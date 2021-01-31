import React from 'react';
import { observer, inject } from 'mobx-react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faEnvelope, faUserCircle, faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'


const Budge = inject("CRMStores")(observer((props) => {
    let icon = props.budge.icon === 'faChartLine' ? faChartLine :
        props.budge.icon === 'faEnvelope' ? faEnvelope :
            props.budge.icon === 'faUserCircle' ? faUserCircle :
                faGlobeAmericas
    return (
        <div className='budge'>
            <FontAwesomeIcon icon={icon} size="5x" color={props.budge.color} />
            <h6>{props.budge.title}</h6>
            <h6>{props.budge.value}</h6>
        </div>
    )
}))

export default Budge;