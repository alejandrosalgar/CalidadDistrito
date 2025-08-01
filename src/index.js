import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';                // un solo “.”
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

const theme = createTheme({ palette: { mode: 'light' } });

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>
);
