/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
import { useSelector } from 'react-redux';

export default function themePalette(theme) {
  const isDarkMode = useSelector((state) => state.customization.systemTheme);
  //theme?.customization?.navType ===

  return {
    mode: isDarkMode,
    common: {
      black: isDarkMode === 'dark' ? theme.colors?.darkPaper : theme.colors?.lightPaper
    },
    primary: {
      light: isDarkMode === 'dark' ? theme.colors?.darkBackground : theme.colors?.primaryLight,
      main: theme.colors?.primaryMain,
      dark: isDarkMode === 'dark' ? theme.colors?.darkPaper : theme.colors?.primaryDark,
      200: theme.colors?.primary200,
      800: theme.colors?.primary800
    },
    secondary: {
      light: isDarkMode === 'dark' ? theme.colors?.secondaryDark : theme.colors?.secondaryLight,
      light_icon: theme.colors?.secondaryLight_icon,
      main: theme.colors?.secondaryMain,
      dark: isDarkMode === 'dark' ? theme.colors?.secondary800 : theme.colors?.secondaryDark,
      dark_icon_hover: theme.colors?.secondaryDark_icon_hover,
      200: theme.colors?.secondary200,
      800: theme.colors?.secondary800
    },
    error: {
      light: isDarkMode === 'dark' ? theme.colors?.errorDark : theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: isDarkMode === 'dark' ? theme.colors?.error800 : theme.colors?.errorDark
    },
    orange: {
      light: isDarkMode === 'dark' ? theme.colors?.orangeDark : theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: isDarkMode === 'dark' ? theme.colors?.orange800 : theme.colors?.orangeDark
    },
    warning: {
      light: isDarkMode === 'dark' ? theme.colors?.warningDark : theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: isDarkMode === 'dark' ? theme.colors?.warning800 : theme.colors?.warningDark
    },
    success: {
      light: isDarkMode === 'dark' ? theme.colors?.successDark : theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: isDarkMode === 'dark' ? theme.colors?.success800 : theme.colors?.successDark
    },
    grey: {
      50: isDarkMode === 'dark' ? theme.colors?.grey900 : theme.colors?.grey50,
      100: isDarkMode === 'dark' ? theme.colors?.grey800 : theme.colors?.grey100,
      500: isDarkMode === 'dark' ? theme.darkTextPrimary : theme.darkTextSecondary,
      600: isDarkMode === 'dark' ? theme.darkTextSecondary : theme.heading,
      700: isDarkMode === 'dark' ? theme.textDark : theme.darkTextPrimary,
      900: theme.textDark
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper
    },
    text: {
      primary: isDarkMode === 'dark' ? theme.colors?.darkTextPrimary : theme.darkTextPrimary,
      secondary: isDarkMode === 'dark' ? theme.colors?.darkTextSecondary : theme.darkTextSecondary,
      dark: theme.textDark,
      hint: isDarkMode === 'dark' ? theme.colors?.grey800 : theme.colors?.grey100
    },
    background: {
      paper: isDarkMode === 'dark' ? theme.colors?.darkPaper : theme.paper,
      default: isDarkMode === 'dark' ? theme.colors?.grey900 : theme.backgroundDefault
    }
  };
}
