import React from 'react';
import { Box, IconButton } from '@mui/material';
import { IconEye, IconPencil, IconTrash } from '@tabler/icons-react';

export const IconMenu = ({ onView, onEdit, onDelete }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <IconButton onClick={onView}>
        <IconEye size={18} />
      </IconButton>
      <IconButton onClick={onEdit}>
        <IconPencil size={18} />
      </IconButton>
      <IconButton onClick={onDelete}>
        <IconTrash size={18} color="red" />
      </IconButton>
    </Box>
  );
};
