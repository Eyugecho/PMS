import { Typography, useTheme } from '@mui/material';
import React from 'react';

const DrogaDonutChart = ({ value }) => {
  const theme = useTheme();
  const strokeWidth = 13;
  const radius = 42;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle stroke={theme.palette.grey[100]} fill="transparent" strokeWidth={strokeWidth} r={normalizedRadius} cx={radius} cy={radius} />
      <circle
        stroke={theme.palette.primary.main}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      <text x="50%" y="50%" dy=".3em" textAnchor="middle" fontSize="20px" fill={theme.palette.grey[800]}>
        {`${value}%`}
      </text>
    </svg>
  );
};

export default DrogaDonutChart;
