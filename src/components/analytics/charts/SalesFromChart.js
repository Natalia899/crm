import React from 'react';
import { observer, inject } from 'mobx-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const SalesFromChart = inject("CRMStores")(observer((props) => {

    // var getDates = function(startDate, endDate) {
    //     var dates = [],
    //         currentDate = startDate,
    //         addDays = function(days) {
    //           var date = new Date(this.valueOf());
    //           date.setDate(date.getDate() + days);
    //           return date;
    //         };
    //     while (currentDate <= endDate) {
    //       dates.push(currentDate);
    //       currentDate = addDays.call(currentDate, 1);
    //     }
    //     return dates;
    //   };
    //   var dates = getDates(new Date(new Date().setDate(new Date().getDate() - 30)), new Date()); 
    //   console.log(dates);

    return (
      <div className='chart'> <h5>Sales For Last Period: </h5> 
        <LineChart
          width={500}
          height={300}
          data={props.CRMStores.chartsData.lastMonth}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="count_date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="counted_leads" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </div>
      );
}))

export default SalesFromChart;

