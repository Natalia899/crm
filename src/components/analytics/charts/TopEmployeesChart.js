import React from 'react';
import { observer, inject } from 'mobx-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const TopEmployeesChart = inject("CRMStores")(observer((props) => {

    return (
        <div className='chart'> <h5>Top Employees </h5>
        <BarChart width={530} height={250} data={props.CRMStores.chartsData.owners}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
        </BarChart>
        </div>
    )
}))

export default TopEmployeesChart;
