import { ThemeProvider, createTheme } from "@mui/material";

function MyThemeProvider({ children }) {
	const theme = createTheme({
		components: {
			MuiButton: {
				defaultProps: {
					variant: "contained",
				},
				styleOverrides: {
					root: {
						borderRadius: "8px",
						textTransform: "capitalize",
					},
				},
			},
		},
		palette: {
			background: { default: "rgb(245, 245, 245)" },
			// primary: {
			// 	main: green[600],
			// 	light: green[400],
			// 	dark: green[800],
			// },
			primary: {
				main: "rgb(102, 153, 153)",
				light: "rgb(133, 173, 173)",
				dark: "rgb(82, 122, 122)",
			},
			// secondary: {
			// 	main: "rgb(255, 153, 51)",
			// 	light: "rgb(255, 179, 102)",
			// 	dark: "rgb(255, 128, 0)",
			// },
			secondary: {
				main: "rgb(204, 204, 255)",
				light: "rgb(230, 230, 255)",
				dark: "rgb(179, 179, 255)",
			},
			// secondary: {
			// 	main: "rgb(153, 204, 255)",
			// 	light: "rgb(204, 230, 255)",
			// 	dark: "rgb(102, 181, 255)",
			// },
		},
	});

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default MyThemeProvider;
