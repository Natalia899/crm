import React from 'react';
import { observer, inject } from 'mobx-react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const TopEmployeesChart = inject("CRMStores", "UpdateStores")(observer((props) => {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';
    return (
        <BarChart
        width={500}
        height={300}
        data={props.CRMStores}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    )
}))

export default TopEmployeesChart;
