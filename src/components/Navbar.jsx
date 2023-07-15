import { Close, Hotel, Menu } from "@mui/icons-material";
import { Drawer, AppBar, Avatar, Box, Container, IconButton, Link as MuiLink, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import generateAvatarLetters from "../utils/generateAvatarLetters";

const NavMuiLink = styled(MuiLink)(({ theme }) => ({
	textDecoration: "none",
	color: "white",
	position: "relative",
	"&:hover": {
		color: "white",
	},
	"&::after": {
		position: "absolute",
		bottom: "-4px",
		left: "50%",
		transform: "translateX(-50%)",
		content: "''",
		height: "2px",
		width: 0,
		borderRadius: "10px",
		transition: "all 0.2s",
		background: theme.palette.secondary.main,
	},
	"&.active::after": {
		width: "70%",
	},
	"&:hover::after": {
		width: "70%",
	},
}));

function Navbar() {
	const { auth } = useAuth();
	const [openDrawer, setOpenDrawer] = useState(false);
	const { pathname } = useLocation();
	const [showShadow, setShowShadow] = useState(false);

	let ommitNavbar = false;
	["signup", "login", "user/create-listing", "user/edit-profile", "user/edit-listing"].forEach((route) => {
		if (pathname.includes(route)) {
			ommitNavbar = true;
		}
	});

	useEffect(() => {
		function changeShowShadow() {
			if (window.pageYOffset > 20) {
				setShowShadow(true);
			} else {
				setShowShadow(false);
			}
		}

		window.addEventListener("scroll", changeShowShadow);

		return () => {
			window.removeEventListener("scroll", changeShowShadow);
		};
	}, []);

	if (ommitNavbar) return;

	return (
		<AppBar sx={{ boxShadow: !showShadow && "none", mb: pathname === "/" ? 0 : 7 }} position="sticky">
			<Container sx={{ py: 1.5, px: { xs: 3, md: 8 } }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						gap: { xs: 2, md: 3 },
					}}
				>
					<Logo />

					<Box component="nav" sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 3 }}>
						<NavMuiLink component={NavLink} to="/" end>
							Home
						</NavMuiLink>
						<NavMuiLink component={NavLink} to="/accomodation">
							Accomodation
						</NavMuiLink>
						{/* <NavMuiLink component={NavLink} to="/about">
							About
						</NavMuiLink> */}
						<NavMuiLink component={NavLink} to="/contact">
							Contact
						</NavMuiLink>
					</Box>

					{
						auth.isLoggedIn && (
							<Avatar
								component={NavLink}
								to={`/user/profile/${auth.user.slug}`}
								title="Account"
								alt={auth.user.username}
								sx={{
									textDecoration: "none",
									color: "white",
									transition: "all 0.2s",
									border: "dotted 3px white",
									"&:hover": {
										color: "white",
										border: "solid 3px white",
									},
									"&.active": {
										border: "solid 3px white",
									},
								}}
							>
								{generateAvatarLetters(auth.user.slug)}
							</Avatar>
						)
						// ) : (
						// 	<IconButton
						// 		size="small"
						// 		component={NavLink}
						// 		title="signin"
						// 		to="/user/login"
						// 		sx={{
						// 			color: "white",
						// 			border: "solid 3px transparent",
						// 			transition: "all 0.2s",
						// 			"&:hover": {
						// 				color: "white",
						// 			},
						// 			"&.active": {
						// 				borderColor: "white",
						// 			},
						// 		}}
						// 	>
						// 		<Person />
						// 	</IconButton>
						// )
					}

					<IconButton
						onClick={() => setOpenDrawer(true)}
						sx={{
							display: { md: "none" },
							color: "white",
							"&:hover": {
								color: "white",
							},
						}}
					>
						<Menu />
					</IconButton>

					<MobileNavDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
				</Box>
			</Container>
		</AppBar>
	);
}

function Logo() {
	return (
		<MuiLink
			component={Link}
			to="/"
			sx={{
				mr: "auto",
				textDecoration: "none",
				display: "flex",
				alignItems: "center",
				color: "white",
				fontWeight: "bold",
				fontSize: "medium",
				"&:hover": {
					color: "white",
				},
			}}
		>
			Off Campus
			<Hotel sx={{ ml: 0.5 }} />
		</MuiLink>
	);
}

function MobileNavDrawer({ openDrawer, setOpenDrawer }) {
	return (
		<Drawer open={openDrawer} anchor="left" onClose={() => setOpenDrawer(false)}>
			<Box
				sx={{
					minWidth: "200px",
					width: "80%",
					p: 2,
					height: "100%",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<div style={{ textAlign: "right" }}>
					<IconButton onClick={() => setOpenDrawer(false)}>
						<Close />
					</IconButton>
				</div>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: 3,
						alignItems: "flex-start",
						justifyContent: "center",
						flexGrow: 1,
					}}
				>
					<NavMuiLink
						onClick={() => setOpenDrawer(false)}
						sx={{
							px: 0,
							color: "text.primary",
							"&:hover": { color: "text.primary" },
							"&::after": { left: 0, transform: "none", backgroundColor: "text.secondary" },
							"&:hover::after": { width: "100%" },
							"&.active::after": { width: "100%" },
						}}
						component={NavLink}
						to="/"
						end
					>
						Home
					</NavMuiLink>

					<NavMuiLink
						onClick={() => setOpenDrawer(false)}
						sx={{
							px: 0,
							color: "text.primary",
							"&:hover": { color: "text.primary" },
							"&::after": { left: 0, transform: "none", backgroundColor: "text.secondary" },
							"&:hover::after": { width: "100%" },
							"&.active::after": { width: "100%" },
						}}
						component={NavLink}
						to="/accomodation"
					>
						Accomodation
					</NavMuiLink>

					{/* <NavMuiLink
						onClick={() => setOpenDrawer(false)}
						sx={{
							px: 0,
							color: "text.primary",
							"&:hover": { color: "text.primary" },
							"&::after": { left: 0, transform: "none", backgroundColor: "text.secondary" },
							"&:hover::after": { width: "100%" },
							"&.active::after": { width: "100%" },
						}}
						component={NavLink}
						to="/about"
					>
						About
					</NavMuiLink> */}

					<NavMuiLink
						onClick={() => setOpenDrawer(false)}
						sx={{
							px: 0,
							color: "text.primary",
							"&:hover": { color: "text.primary" },
							"&::after": { left: 0, transform: "none", backgroundColor: "text.secondary" },
							"&:hover::after": { width: "100%" },
							"&.active::after": { width: "100%" },
						}}
						component={NavLink}
						to="/contact"
					>
						Contact
					</NavMuiLink>
				</Box>
			</Box>
		</Drawer>
	);
}

export default Navbar;
