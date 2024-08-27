import React from 'react';
import { Box, Stack, useTheme } from '@mui/material';
import { IconCircle, IconCircleCheckFilled, IconCircleX, IconCircleXFilled } from '@tabler/icons-react';

const TaskProgress = ({ numberOfSteps, status }) => {
  const theme = useTheme();

  const steps = Array.from({ length: numberOfSteps - 1 }, (_, index) => (
    <React.Fragment key={index}>
      <IconCircleCheckFilled size="1.1rem" stroke="2" style={{ color: 'green' }} />
      <Box
        sx={{
          width: 12,
          height: 2,
          backgroundColor: 'green'
        }}
      />
    </React.Fragment>
  ));

  const lastStepIcon =
    status === 'approved' ? (
      <IconCircleCheckFilled size="1.1rem" stroke="2" style={{ color: 'green' }} />
    ) : status === 'rejected' ? (
      <IconCircleXFilled size="1.1rem" stroke="2" style={{ color: 'red' }} />
    ) : (
      <IconCircle size="1.1rem" stroke="2" style={{ color: 'gray' }} />
    );

  return (
    <Box sx={{ marginTop: 1 }}>
      <Stack direction="row" alignItems="center">
        {steps}
        {lastStepIcon}
      </Stack>
    </Box>
  );
};

export default TaskProgress;
