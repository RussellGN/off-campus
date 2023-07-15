import { useMediaQuery, useTheme } from "@mui/material";

function useIsMobile() {
	const theme = useTheme();
	return useMediaQuery(`(max-width: ${theme.breakpoints.values.md}px)`);
}

export default useIsMobile;
