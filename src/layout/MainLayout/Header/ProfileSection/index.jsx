import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import User1 from 'assets/images/users/user-round.svg';

// assets
import { IconLogout, IconPaperclip, IconSettings, IconShield, IconUser } from '@tabler/icons-react';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        sx={{
          backgroundColor: theme.palette.primary.light,
          cursor: 'pointer',
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        color="inherit"
        variant="outlined"
        onClick={handleToggle}
      >
        <IconUser />
      </IconButton>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={8} border={true} content={false} boxShadow shadow={theme.shadows[4]}>
                  <Box sx={{ p: 2.6, pb: 2, borderBottom: 1.3, borderColor: theme.palette.grey[200] }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4"> Abebe Bikila</Typography>
                      </Stack>
                      <Typography variant="caption">Admin</Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,

                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5
                        }
                      }}
                    >
                      <Box sx={{ p: 0.6, pt: 0 }}>
                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={(event) => handleListItemClick(event, 0, '/account')}
                        >
                          <ListItemIcon>
                            <IconUser stroke={1.8} size="1.4rem" color="black" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="subtitle1">Account</Typography>} />
                        </ListItemButton>

                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={(event) => handleListItemClick(event, 1, '#')}
                        >
                          <ListItemIcon>
                            <IconPaperclip stroke={1.8} size="1.4rem" color="black" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="subtitle1">Terms and Conditions</Typography>} />
                        </ListItemButton>

                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={(event) => handleListItemClick(event, 2, '#')}
                        >
                          <ListItemIcon>
                            <IconShield stroke={1.8} size="1.4rem" color="black" />
                          </ListItemIcon>
                          <ListItemText primary={<Typography variant="subtitle1">Privacy policy</Typography>} />
                        </ListItemButton>
                      </Box>
                      <Box sx={{ mt: 2, px: 1, borderTop: 1.3, borderColor: theme.palette.grey[200] }}>
                        <ListItemButton
                          sx={{
                            textAlign: 'center',
                            p: 0.4,
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={handleLogout}
                        >
                          <ListItemText primary={<Typography variant="body2">Sign out</Typography>} />
                        </ListItemButton>
                      </Box>
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
