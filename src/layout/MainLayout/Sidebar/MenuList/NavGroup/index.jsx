import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { List, Typography, Collapse } from '@mui/material';
import NavItem from '../NavItem';
import NavCollapse from '../NavCollapse';

// ==============================|| SIDEBAR MENU LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true); // Default to true to expand the first header

  const handleToggle = () => {
    setOpen(!open);
  };

  // menu list collapse & items
  const items = item.children?.map((menu) => {
    switch (menu.type) {
      case 'collapse':
        return <NavCollapse key={menu.id} menu={menu} level={1} />;
      case 'item':
        return <NavItem key={menu.id} item={menu} level={1} />;
      default:
        return (
          <Typography key={menu.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      <List
        subheader={
          item.title && (
            <Typography
              variant="caption"
              sx={{ ...theme.typography.menuCaption, color: 'inherit', cursor: 'pointer' }}
              display="block"
              gutterBottom
              onClick={handleToggle}
            >
              {item.icon && <item.icon style={{ marginRight: 5 }} />}
              {item.title}
              {item.caption && (
                <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block">
                  {item.caption}
                </Typography>
              )}
            </Typography>
          )
        }
      >
        <Collapse in={open}>{items}</Collapse>
      </List>
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
