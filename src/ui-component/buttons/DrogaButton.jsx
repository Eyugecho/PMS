import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import AnimateButton from 'ui-component/extended/AnimateButton';

const DrogaButton = ({ title, sx, onPress, icon, type, ...props }) => {
  return (
    <AnimateButton>
      <Button
        type={type ? type : 'button'}
        {...props}
        variant="contained"
        sx={{ borderRadius: 2, padding: 1, px: 2, ...sx }}
        onClick={onPress}
      >
        {icon} <b>{title}</b>
      </Button>
    </AnimateButton>
  );
};

DrogaButton.propTypes = {
  title: PropTypes.oneOf([PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
  onPress: PropTypes.func
};
export default DrogaButton;
