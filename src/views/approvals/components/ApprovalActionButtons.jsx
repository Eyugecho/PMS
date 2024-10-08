import React from 'react';
import { Box } from '@mui/material';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import PropTypes from 'prop-types';

const ApprovalActionButtons = ({ onReject, onApprove }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {onReject && <DrogaButton title={'Reject'} variant="text" color="error" onPress={onReject} sx={{ px: 4 }} />}

      {onApprove && (
        <DrogaButton title={'Approve'} variant="contained" color="success" onPress={onApprove} sx={{ ml: 2, px: 8, boxShadow: 0 }} />
      )}
    </Box>
  );
};

ApprovalActionButtons.propTypes = {
  onReject: PropTypes.func,
  onApprove: PropTypes.func
};

export default ApprovalActionButtons;
