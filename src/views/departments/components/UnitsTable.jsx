// import React from 'react';
// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
// import { IconMenu } from 'ui-component/menu/IconMenu';
// import { useNavigate } from 'react-router-dom';

// const UnitsTable = ({ units }) => {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   return (
//     <TableContainer component={Paper} sx={{ minHeight: '66dvh', border: 0.4, borderColor: theme.palette.grey[300], borderRadius: 2 }}>
//       <Table sx={{ minWidth: 650 }} aria-label="Organization unit table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Unit name</TableCell>
//             <TableCell>Unit type</TableCell>
//             <TableCell>Manager</TableCell>
//             <TableCell></TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {units?.map((unit, index) => (
//             <>
//               <TableRow
//                 key={index}
//                 sx={{
//                   ':hover': {
//                     backgroundColor: theme.palette.grey[100],
//                     color: theme.palette.background.default,
//                     cursor: 'pointer',
//                     borderRadius: 2
//                   }
//                 }}
//               >
//                 <TableCell sx={{ display: 'flex', alignItems: 'center', border: 0 }}>
//                   <Typography variant="subtitle1">{unit?.name}</Typography>
//                 </TableCell>
//                 <TableCell sx={{ border: 0 }}>{unit?.unit_type?.name}</TableCell>
//                 <TableCell sx={{ border: 0 }}>
//                   {' '}
//                   <Typography variant="subtitle1">{unit?.manager?.user?.name}</Typography> {unit?.manager?.position}
//                 </TableCell>
//                 <TableCell sx={{ border: 0 }}>
//                   <IconMenu onView={() => navigate('/units/view', { state: unit })} />
//                 </TableCell>
//               </TableRow>
//             </>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default UnitsTable;


import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, TablePagination, IconButton, Menu, MenuItem, ListItemIcon, Avatar } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { MoreHoriz } from '@mui/icons-material';

const UnitsTable = ({ units }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);

  const handleClick = (event, unit) => {
    setAnchorEl(event.currentTarget);
    setSelectedUnit(unit);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUnit(null);
  };

  const handleView = () => {
    navigate('/units/view', { state: selectedUnit });
    handleClose();
  };

  const handleEdit = () => {
    // Implement edit functionality
    handleClose();
  };

  const handleDelete = () => {
    // Implement delete functionality
    handleClose();
  };

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Slice data for pagination
  const paginatedUnits = units?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper 
      sx={{ 
        minHeight: '66dvh', 
        border: 0.4, 
        borderColor: theme.palette.grey[300], 
        borderRadius: 2, 
        boxShadow: theme.shadows[2], 
        overflow: 'hidden' 
      }}
    >
      <TableContainer>
        
        <Table 
          sx={{ 
            minWidth: 650, 
            borderCollapse: 'collapse' 
          }} 
          aria-label="Organization unit table"
        >
          <TableHead>
            <TableRow>
              {['Unit Name', 'Unit Type', 'Manager', 'Actions'].map((header, index) => (
                <TableCell 
                  key={header}
                  sx={{ 
                    background: theme.palette.grey[100], 
                    color: '#000', 
         
                    fontWeight: 'bold', 
                    fontSize: '0.9rem', 
                    borderBottom: `2px solid ${theme.palette.divider}`,
                    position: 'relative',
                    padding: '12px 16px',
                    '&:not(:last-of-type)': {
                      borderRight: `1px solid ${theme.palette.divider}`,
                    }
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUnits?.map((unit, index) => (
              <TableRow
                key={index}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.grey[50],
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.grey[100],
                 
                  },
                }}
              >
                <TableCell 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    border: 0, 
                    padding: '12px 16px' 
                  }}
                >
                  <Typography variant="subtitle3" sx={{ flexGrow: 1 }}>{unit?.name}</Typography>
                </TableCell>
                <TableCell 
                  sx={{ 
                    border: 0, 
                    padding: '12px 16px',
                  }}
                >
                  {unit?.unit_type?.name}
                </TableCell>
                <TableCell 
                  sx={{ 
                    border: 0, 
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Avatar 
                    alt={unit?.manager?.user?.name} 
                    sx={{ width: 25, height: 25, marginRight: 1 }}
                  />
                  <div style={{display:'flex',flexDirection:'column'}}>
                    <Typography variant="subtitle3" sx={{ flexGrow: 1 }}>{unit?.manager?.user?.name}</Typography> 
                    <Typography variant='subtitle2'>{unit?.manager?.position}</Typography> 
                  </div>
                </TableCell>
                <TableCell 
                  sx={{ 
                    border: 0, 
                    padding: '12px 16px' 
                  }}
                >
                  <IconButton 
                    onClick={(event) => handleClick(event, unit)}
                    size="small"
                  >
                    <MoreHoriz />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  
                          sx={{
                              '& .MuiPaper-root': {
                                backdropFilter: 'blur(10px)', 
                                backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                                borderRadius: 2,
                                boxShadow: theme.shadows[1],
                              },
                            }}
                  >
                    <MenuItem onClick={handleView} >
                      <ListItemIcon>
                        <VisibilityIcon fontSize="small" style={{paddingRight:'4px' ,color:'gray'}}/>
                      </ListItemIcon>
                      View
                    </MenuItem>
                    <MenuItem onClick={handleEdit}>
                      <ListItemIcon>
                        <EditIcon fontSize="small" style={{paddingRight:'4px' ,color:'#11365A'}}/>
                      </ListItemIcon>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                      <ListItemIcon>
                        <DeleteIcon fontSize="small" style={{paddingRight:'4px' ,color:'red'}}/>
                      </ListItemIcon>
                      Delete
                    </MenuItem>
                  </Menu>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={units?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default UnitsTable;




