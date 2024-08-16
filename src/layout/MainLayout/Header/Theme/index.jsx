import { Button, IconButton } from '@mui/material';
import { IconMoon, IconSun } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SET_SYSTEM_THEME } from 'store/actions';

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState('light');

  const systemTheme = useSelector((state) => state.customization.systemTheme);
  const dispatch = useDispatch();

  const handleThemeChange = (theme) => {
    dispatch({ type: SET_SYSTEM_THEME, systemTheme: theme });
  };
  return (
    <div style={{ marginRight: 10 }}>
      {systemTheme === 'dark' && (
        <IconButton onClick={() => handleThemeChange('light')}>
          <IconSun size={22} />
        </IconButton>
      )}
      {systemTheme === 'light' && (
        <IconButton onClick={() => handleThemeChange('dark')}>
          <IconMoon size={22} />
        </IconButton>
      )}
    </div>
  );
};

export default ToggleTheme;
