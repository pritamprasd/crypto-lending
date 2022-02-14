import { createTheme } from '@mui/material/styles';

export const defaultTheme = createTheme({
    palette: {
        primary: {
            main: "#662200"
        }
    },
    typography: {
        fontFamily: [
            'Manrope', 'sans-serif',
        ].join(','),
      },
})