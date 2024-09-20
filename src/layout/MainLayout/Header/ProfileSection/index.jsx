import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Chip,
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

// assets
import { IconPaperclip, IconShield, IconUser } from '@tabler/icons-react';
import { Storage } from 'configration/storage';
import { SIGN_IN } from 'store/actions/actions';
import DepartmentCard from './DepartmentCard';
import Backend from 'services/backend';
import GetToken from 'utils/auth-token';
import { toast } from 'react-toastify';
import StoreUserUnit from 'utils/set-user-unit';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);
  const user = useSelector((state) => state.user.user); // signed in user information
  const unit = useSelector((state) => state.user.my_unit);

  !unit && dispatch(StoreUserUnit());

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    dispatch({ type: SIGN_IN, signed: false });
    Storage.clear();
    navigate('/');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
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
                  <Box sx={{ p: 2.6, pb: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4"> {`${user ? user.name : 'Your name'}`}</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ marginTop: 1.6 }}>
                        {user?.roles?.map((role, index) => (
                          <Chip key={index} label={role?.name} sx={{ bgcolor: 'grey.50' }} />
                        ))}
                      </Stack>
                    </Stack>
                  </Box>

                  <DepartmentCard unit={unit} />

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
                            <IconUser stroke={1.8} size="1.4rem" style={{ color: theme.palette.text.primary }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color={theme.palette.text.primary}>
                                Account
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={(event) => handleListItemClick(event, 1, '#')}
                        >
                          <ListItemIcon>
                            <IconPaperclip stroke={1.8} size="1.4rem" style={{ color: theme.palette.text.primary }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color={theme.palette.text.primary}>
                                Terms and Conditions
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        <ListItemButton
                          sx={{
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={(event) => handleListItemClick(event, 2, '#')}
                        >
                          <ListItemIcon>
                            <IconShield stroke={1.8} size="1.4rem" style={{ color: theme.palette.text.primary }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="subtitle1" color={theme.palette.text.primary}>
                                Privacy policy
                              </Typography>
                            }
                          />
                        </ListItemButton>
                      </Box>
                      <Box sx={{ mt: 2, px: 1, borderTop: 1.3, borderColor: theme.palette.divider }}>
                        <ListItemButton
                          sx={{
                            textAlign: 'center',
                            p: 0.4,
                            borderRadius: `${customization.borderRadius}px`,
                            ':hover': { backgroundColor: theme.palette.grey[50] }
                          }}
                          onClick={handleLogout}
                        >
                          <ListItemText
                            primary={
                              <Typography variant="body2" color={theme.palette.text.primary}>
                                Sign out
                              </Typography>
                            }
                          />
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
