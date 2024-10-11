import React from 'react';
import { Box } from '@mui/material';
import DrogaButton from 'ui-component/buttons/DrogaButton';
import PropTypes from 'prop-types';

const ApprovalActionButtons = ({ onReview, onApprove }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {onReview && <DrogaButton title={'Reviewed'} variant="outlined" color="info" onPress={onReview} sx={{ px: 4, boxShadow: 0 }} />}

      {onApprove && (
        <DrogaButton title={'Approve'} variant="contained" color="primary" onPress={onApprove} sx={{ ml: 2, px: 8, boxShadow: 0 }} />
      )}
    </Box>
  );
};

ApprovalActionButtons.propTypes = {
  onReview: PropTypes.func,
  onApprove: PropTypes.func
};

export default ApprovalActionButtons;
