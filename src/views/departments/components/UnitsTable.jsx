import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { IconMenu } from 'ui-component/menu/IconMenu';
import { useNavigate } from 'react-router-dom';

const UnitsTable = ({ units }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper} sx={{ minHeight: '66dvh', border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 2 }}>
      <Table sx={{ minWidth: 650 }} aria-label="Organization unit table">
        <TableHead>
          <TableRow>
            <TableCell>Unit name</TableCell>
            <TableCell>Unit type</TableCell>
            <TableCell>Manager</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units?.map((unit, index) => (
            <>
              <TableRow
                key={index}
                sx={{
                  ':hover': {
                    backgroundColor: theme.palette.grey[100],
                    color: theme.palette.background.default,
                    cursor: 'pointer',
                    borderRadius: 2
                  }
                }}
              >
                <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
                  <Typography variant="subtitle1">{unit?.name}</Typography>
                </TableCell>
                <TableCell sx={{ border: 0 }}>{unit?.unit_type?.name}</TableCell>
                <TableCell sx={{ border: 0 }}>
                  {' '}
                  <Typography variant="subtitle1">{unit?.manager?.user?.name}</Typography> {unit?.manager?.position}
                </TableCell>
                <TableCell sx={{ border: 0 }}>
                  <IconMenu onView={() => navigate('/units/view', { state: unit })} />
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UnitsTable;
