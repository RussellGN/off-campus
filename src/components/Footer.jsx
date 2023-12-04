import { ArrowUpward, KeyboardDoubleArrowRight } from "@mui/icons-material";
import { Box, IconButton, Link as MuiLink, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function Footer  () {
	const { pathname } = useLocation();
	let ommitFooter = false;

	["signup", "login", "user/create-listing", "user/edit-profile", "user/edit-listing"].forEach((route) => {
		if (pathname.includes(route)) {
			ommitFooter = true;
		}
	});

	if (ommitFooter) return;

	return (
		<Box
			sx={{
				my: 5,
				borderTop: "solid",
				borderColor: "secondary.main",
				p: { xs: 2, sm: 4 },
			}}
		>
			<Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
				<MuiLink
					underline="none"
					component={Link}
					to="/user/login"
					sx={{ "&:hover": { color: "primary.main" } }}
				>
					<KeyboardDoubleArrowRight sx={{ mr: 0.4 }} />
					Login
				</MuiLink>
				<MuiLink
					underline="none"
					component={Link}
					to="/advertise"
					sx={{ "&:hover": { color: "primary.main" } }}
				>
					<KeyboardDoubleArrowRight sx={{ mr: 0.4 }} />
					Advertise
				</MuiLink>
			</Box>

			<Box
				sx={{
					mt: 2,
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="body2" sx={{display: "none"}}>
					All Rights Reserved. Developed By
					<MuiLink
						underline="none"
						component="a"
						target="_blank"
						href="https://websolutionsharare.github.io/frontdesk"
						sx={{ px: 0.5, "&:hover": { color: "primary.main" } }}
					>
						Web Solutions Harare
					</MuiLink>
				</Typography>
				<IconButton title="Back to top" size="small" onClick={() => window.scrollTo(0, 0)}>
					<ArrowUpward />
				</IconButton>
			</Box>
		</Box>
	);
};

export default Footer;
