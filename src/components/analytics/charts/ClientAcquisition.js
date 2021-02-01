import React from 'react'
import {Pie} from 'react-chartjs-2';

function ClientPie() {
    const data = {
        labels: [
            'Last month',
            '6-12 months',
            '>12 months'
        ],
        datasets: [{
            data: [125, 8, 47],
            backgroundColor: ['#795548', '#34495e', '#95a5a6'],
            hoverBackgroundColor: ['#795548', '#34495e', '#95a5a6']
        }]
    };

    return (
        <div className='chart'>
            <h5>Client Acquisition</h5>
            <Pie data={data} />
        </div>
    )
}

export default ClientPie