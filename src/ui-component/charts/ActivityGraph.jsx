import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Fallbacks from 'utils/components/Fallbacks';

const ActivityGraph = ({ data }) => {
  // Check if data is provided and not empty
  const isDataAvailable = data && data.length > 0;

  // Extract dates for the x-axis labels if data is available, otherwise use a placeholder
  const dates = isDataAvailable ? data.map((item) => item.date) : ['No Data'];

  // Extract task counts for each status across all dates if data is available, otherwise use placeholders
  const statuses = ['pending', 'inprogress', 'done', 'blocked', 'cancelled'];
  const series = isDataAvailable
    ? statuses.map((status) => ({
        name: status,
        data: data.map((item) => {
          const statusObj = item.statuses.find((s) => s.status === status);
          return statusObj ? parseInt(statusObj.task_count) : 0;
        })
      }))
    : statuses.map((status) => ({
        name: status,
        data: [0] // Placeholder data
      }));

  const [chartState] = useState({
    series: series,
    options: {
      chart: {
        type: 'bar',
        height: 380,
        stacked: true
      },
      xaxis: {
        categories: dates, // Dates on the x-axis or 'No Data'
        labels: {
          formatter: function (val) {
            return val; // Display date as it is or 'No Data'
          }
        }
      },
      title: {
        text: 'Task Status by Date'
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val; // Tooltip also displays the date or 'No Data'
          }
        }
      }
    }
  });

  return (
    <div>
      {isDataAvailable ? (
        <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={380} />
      ) : (
        <Fallbacks
          severity="activities"
          title={`The activity data is not found`}
          description={`The graph of activities summary is shown here`}
          sx={{ paddingTop: 6 }}
          size={100}
        />
      )}
    </div>
  );
};

export default ActivityGraph;
