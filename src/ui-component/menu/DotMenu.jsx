import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Tooltip, Typography, useTheme } from '@mui/material';
import { IconDots, IconDotsVertical, IconEye, IconPencil, IconTrash } from '@tabler/icons-react';
import PropTypes from 'prop-types';

export const DotMenu = ({ orientation, onView, onEdit, onStatusChange, status, statusIcon, onDelete, sx }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Tooltip>
        <IconButton
          onClick={handleMenuClick}
          size="small"
          sx={{ ml: 2, ...sx }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          {orientation === 'horizontal' ? <IconDots stroke="1.4" size="1.4rem" /> : <IconDotsVertical stroke="1.4" size="1.4rem" />}
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {onView && (
          <MenuItem
            onClick={onView}
            sx={{
              margin: 0.5,
              borderRadius: theme.shape.borderRadius,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <IconEye size={18} />{' '}
            <Typography variant="body2" color={theme.palette.text.primary} sx={{ marginLeft: 1 }}>
              View
            </Typography>
          </MenuItem>
        )}

        {onEdit && (
          <MenuItem
            onClick={onEdit}
            sx={{
              margin: 0.5,
              borderRadius: theme.shape.borderRadius,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <IconPencil size={18} />
            <Typography variant="body2" color={theme.palette.text.primary} sx={{ marginLeft: 1 }}>
              Edit
            </Typography>
          </MenuItem>
        )}

        {onStatusChange && (
          <MenuItem
            onClick={onStatusChange}
            sx={{
              margin: 0.5,
              borderRadius: theme.shape.borderRadius,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {statusIcon && statusIcon}
            <Typography variant="body2" color={theme.palette.text.primary} sx={{ marginLeft: 1 }}>
              {status}
            </Typography>
          </MenuItem>
        )}

        {onDelete && (
          <MenuItem
            onClick={onDelete}
            sx={{
              margin: 0.5,
              borderRadius: theme.shape.borderRadius,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <IconTrash size={18} color="red" />
            <Typography variant="body2" color={theme.palette.text.primary} sx={{ marginLeft: 1 }}>
              Delete
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

DotMenu.propTypes = {
  children: PropTypes.node,
  onView: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  orientation: PropTypes.string
};
