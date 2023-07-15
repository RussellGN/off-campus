import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
	CircularProgress,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Avatar,
	Box,
	Button,
	Grid,
	IconButton,
	Typography,
	useTheme,
	Pagination,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";
import { Add, WarningRounded, Edit, Email, Logout, Person, ContactPage } from "@mui/icons-material";
import useProfileListings from "../hooks/useProfileListings";

import Listing from "../components/Listing";
import generateAvatarLetters from "../utils/generateAvatarLetters";

function useProfile() {
	const {
		auth: { isLoggedIn, user },
		logout,
	} = useAuth();
	const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
	const navigate = useNavigate();
	const { listings, loading, error, page, pageCount, setPage } = useProfileListings();

	function confirmLogout() {
		logout();
		hideLogoutDialog();
	}
	const showLogoutDialog = () => setOpenLogoutDialog(true);
	const hideLogoutDialog = () => setOpenLogoutDialog(false);

	useEffect(() => {
		if (!isLoggedIn) {
			console.log("You're not logged in!");
			navigate("/");
			// TODO: implement custom alerts
		}
	}, [isLoggedIn]);

	return {
		isLoggedIn,
		user,
		openLogoutDialog,
		showLogoutDialog,
		hideLogoutDialog,
		confirmLogout,
		listings,
		loading,
		error,
		page,
		pageCount,
		setPage,
	};
}

function Profile() {
	const {
		isLoggedIn,
		user,
		openLogoutDialog,
		showLogoutDialog,
		hideLogoutDialog,
		confirmLogout,
		listings,
		loading,
		error,
		page,
		pageCount,
		setPage,
	} = useProfile();
	const theme = useTheme();

	if (!isLoggedIn) return "error";

	return (
		<>
			<LogoutDialog {...{ openLogoutDialog, hideLogoutDialog, confirmLogout }} />

			<Box sx={{ minHeight: "60vh" }}>
				<Grid container spacing={0} gap={3}>
					<Grid item xs={12} md={3}>
						<Box
							sx={{
								borderRadius: "20px",
								boxShadow: theme.shadows,
								backgroundColor: "divider",
								position: { md: "sticky" },
								p: 3,
								top: "100px",
								py: { md: 8 },
							}}
						>
							<Box
								sx={{
									mb: 2,
									display: "flex",
									justifyContent: "space-between",
									alignItems: "center",
								}}
							>
								<Avatar
									alt={user.username}
									sx={{
										boxShadow: theme.shadows[3],
										color: "white",
									}}
								>
									{generateAvatarLetters(user.slug)}
								</Avatar>

								<IconButton
									title="Edit Details"
									component={Link}
									to={"/user/edit-profile/" + user.slug}
									size="small"
									sx={{ "&:hover": { color: "inherit" } }}
								>
									<Edit />
								</IconButton>
							</Box>
							<Box>
								<Typography
									sx={{
										mb: 1,
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									<Person fontSize="small" sx={{ mr: 0.5 }} />
									{user.username}
								</Typography>
								<Typography
									sx={{
										mb: 1,
										width: "100%",
										whiteSpace: "nowrap",
										overflow: "hidden",
										textOverflow: "ellipsis",
									}}
								>
									<Email fontSize="small" sx={{ mr: 0.5 }} />
									{user.email}
								</Typography>
								<Typography sx={{ display: "flex", alignItems: "flex-start", gap: 0.5 }}>
									<ContactPage fontSize="small" />
									<span>{user.contactDetails}</span>
								</Typography>
							</Box>
						</Box>
					</Grid>

					<Grid item xs={12} md>
						<div>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 1,
									mb: 3,
									p: 3,
									backgroundColor: "divider",
									borderRadius: "20px",
									boxShadow: theme.shadows,
								}}
							>
								<Button
									component={Link}
									to="/user/create-listing"
									size="small"
									startIcon={<Add />}
									sx={{ mr: "auto", "&:hover": { color: "white" } }}
								>
									New Listing
								</Button>
								<IconButton title="Logout" onClick={showLogoutDialog} size="small">
									<Logout />
								</IconButton>
							</Box>

							<Box sx={{ p: 2, minHeight: "40vh" }}>
								<Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
									Your listings
								</Typography>

								{loading ? (
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "flex-start",
											pt: 10,
											width: "100%",
											height: "80vh",
										}}
									>
										<CircularProgress />
									</Box>
								) : error ? (
									<Box
										sx={{
											display: "flex",
											justifyContent: "center",
											alignItems: "flex-start",
											pt: 10,
											width: "100%",
											height: "80vh",
										}}
									>
										<Typography variant="body2">
											<WarningRounded sx={{ color: "divider", mr: 0.4 }} />
											{error}
										</Typography>
									</Box>
								) : listings.length === 0 ? (
									<Typography paragraph textAlign="center">
										No listings yet. Create Some!
									</Typography>
								) : (
									<>
										{listings?.map((listing) => (
											<Listing key={listing.id} listing={listing} />
										))}
										<Pagination
											page={page}
											count={pageCount}
											onChange={(e, newPage) => {
												if (page !== newPage) {
													setPage(newPage);
												}
											}}
											variant="outlined"
											sx={{ display: "flex", justifyContent: "center" }}
											color="primary"
										/>
									</>
								)}
							</Box>
						</div>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

function LogoutDialog({ openLogoutDialog, hideLogoutDialog, confirmLogout }) {
	return (
		<Dialog
			open={openLogoutDialog}
			onClose={hideLogoutDialog}
			aria-labelledby="logout-dialog-title"
			aria-describedby="logout-dialog-description"
			maxWidth="xs"
			sx={{ textAlign: "center" }}
		>
			<DialogTitle noWrap id="logout-dialog-title" sx={{ pt: 3 }}>
				Logout
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="logout-dialog-description">Are you sure you want to logout?</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "center", pb: 3 }}>
				<Button size="small" onClick={hideLogoutDialog}>
					Cancel
				</Button>
				<Button size="small" onClick={confirmLogout} autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default Profile;
