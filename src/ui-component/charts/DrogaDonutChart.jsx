import React from 'react';
import { useTheme } from '@mui/material';

const DrogaDonutChart = ({ value, size }) => {
  const theme = useTheme();
  const strokeWidth = size && size > 0 ? size / 2.8 : 16;
  const radius = size && size > 0 ? size : 42;
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
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        fontSize={`${size && size > 0 ? size / 2.4 : 20}px`}
        fill={theme.palette.text.primary}
      >
        {`${value}%`}
      </text>
    </svg>
  );
};

export default DrogaDonutChart;
