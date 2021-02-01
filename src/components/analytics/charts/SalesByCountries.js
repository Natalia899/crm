import React from 'react';
import { observer, inject } from 'mobx-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const SalesByCountries = inject("CRMStores")(observer((props) => {
console.log('hiii');
    return (
        <div className='chart'> <h5>Sales By Countries </h5>
        <BarChart width={530} height={250} data={props.CRMStores.chartsData.countries}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
        </div>
    )
}))

export default SalesByCountries;