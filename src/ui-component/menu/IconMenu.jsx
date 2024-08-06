import React from 'react';
import { Box, IconButton } from '@mui/material';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';

export const IconMenu = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <IconButton>
        <IconEye size={18} />
      </IconButton>
      <IconButton>
        <IconPencil size={18} />
      </IconButton>
      <IconButton>
        <IconTrash size={18} color="red" />
      </IconButton>
    </Box>
  );
};
