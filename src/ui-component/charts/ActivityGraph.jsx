import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ActivityGraph = () => {
  const [chartState] = useState({
    series: [
      {
        name: 'Tasks',
        data: [
          { x: '01/01', y: 400 },
          { x: '04/01', y: 430 },
          { x: '07/01', y: 448 },
          { x: '10/01', y: 470 },
          { x: '01/01', y: 540 },
          { x: '04/01', y: 580 },
          { x: '07/01', y: 690 },
          { x: '10/01', y: 690 }
        ]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 380
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function (val) {
            return val;
          }
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          }
        }
      }
    }
  });

  return <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={380} />;
};

export default ActivityGraph;
