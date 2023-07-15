import { Home } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Page404() {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 0.2,
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				height: "80vh",
				width: "100%",
			}}
		>
			<div>Page Not Found</div>
			<Button component={Link} to="/" startIcon={<Home />} sx={{ mt: 2, "&:hover": { color: "white" } }}>
				Home
			</Button>
		</Box>
	);
}

export default Page404;
