import { Place, DirectionsWalk, AttachMoney, Delete, Edit } from "@mui/icons-material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import friendlyDate from "../utils/friendlyDate";
import {
	Button,
	Box,
	Grid,
	useTheme,
	Typography,
	IconButton,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	useMediaQuery,
} from "@mui/material";

function DeleteListingDialog({ title, openDelete, closeDeleteDialog }) {
	function handleDelete() {
		console.log("deleted '", title, "'");
		closeDeleteDialog();
	}

	return (
		<Dialog
			open={openDelete}
			onClose={closeDeleteDialog}
			aria-labelledby="delete-dialog-title"
			aria-describedby="delete-dialog-description"
			maxWidth="xs"
			sx={{ textAlign: "center" }}
		>
			<DialogTitle noWrap id="delete-dialog-title" sx={{ pt: 3 }}>
				Delete - "{title}"
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="delete-dialog-description">
					Are you sure you want to delete this listing?{" "}
				</DialogContentText>
			</DialogContent>
			<DialogActions sx={{ justifyContent: "center", pb: 3 }}>
				<Button size="small" onClick={closeDeleteDialog}>
					Cancel
				</Button>
				<Button size="small" onClick={handleDelete} autoFocus>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

function Listing({ listing }) {
	const [openDelete, setOpenDelete] = useState(false);
	const { pathname } = useLocation();
	const theme = useTheme();

	const openDeleteDialog = () => setOpenDelete(true);
	const closeDeleteDialog = () => setOpenDelete(false);

	const isTablet =
		useMediaQuery(`(min-width: ${theme.breakpoints.values.sm}px)`) &
		useMediaQuery(`(max-width: ${theme.breakpoints.values.md}px)`);

	return (
		<>
			<DeleteListingDialog {...{ openDelete, closeDeleteDialog, title: listing.title }} />
			<Box
				sx={{
					border: "solid thin",
					borderColor: "divider",
					boxShadow: theme.shadows[5],
					borderRadius: "8px",
					mb: 5,
					p: 1,
					mx: isTablet ? "5px" : 0,
					width: isTablet ? "48%" : "100%",
					display: isTablet ? "inline-block" : "block",
					// width: isTablet && '50%',
				}}
			>
				<Grid container spacing={0}>
					<Grid item xs={12} md={7}>
						<Box
							sx={{
								borderRadius: "8px",
								overflow: "hidden",
								height: "100%",
								display: "grid",
								gap: "2px",
								gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
								gridTemplateRows: "1fr 1fr",
							}}
						>
							<img
								src={listing.images[0]}
								alt={listing.title}
								style={{
									gridColumn: "span 3",
									gridRow: "span 2",
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
							/>
							<img
								src={listing.images[1]}
								alt={listing.title}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
							<img
								src={listing.images[2]}
								alt={listing.title}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
							<img
								src={listing.images[3]}
								alt={listing.title}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
							<img
								src={listing.images[4]}
								alt={listing.title}
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
						</Box>
					</Grid>

					<Grid item xs={12} md={5}>
						<Box
							sx={{
								p: { xs: 1, md: 2.5 },
								height: "100%",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								gap: 2,
							}}
						>
							<Grid container spacing={0} gap={2} alignItems="center" justifyContent="space-between">
								<Grid item xs zeroMinWidth>
									<Typography variant="h6" noWrap>
										{listing.title}
									</Typography>
								</Grid>
								<Grid item xs="auto">
									<Typography variant="caption" color="primary">
										{friendlyDate(listing.date)}
									</Typography>
								</Grid>
							</Grid>

							<div>
								<Typography variant="body1" sx={{ mb: 1 }}>
									<Place fontSize="small" sx={{ mr: 0.2 }} />
									{listing.location}
								</Typography>
								<Typography variant="body1" sx={{ mb: 1 }}>
									<DirectionsWalk fontSize="small" sx={{ mr: 0.2 }} />
									{`${listing.distance} km to ${listing.nearestTo}`}
								</Typography>
								<Typography variant="body1">
									<AttachMoney fontSize="small" sx={{ mr: 0.2 }} />
									{`${listing.rent} / month`}
								</Typography>
							</div>

							<Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
								<Button
									size="small"
									sx={{ "&:hover": { color: "white" } }}
									component={Link}
									to={`/accomodation/${listing.slug}`}
								>
									View
								</Button>

								{pathname.includes("/profile/") && (
									<>
										<IconButton title="Delete" size="small" onClick={openDeleteDialog}>
											<Delete />
										</IconButton>
										<IconButton
											size="small"
											component={Link}
											title="Edit"
											to={`/user/edit-listing/${listing.slug}`}
											sx={{ "&:hover": { color: "inherit" } }}
										>
											<Edit />
										</IconButton>
									</>
								)}
								<Typography variant="body2" sx={{ ml: "auto" }}>
									{pathname.includes("/profile/") ? "698 Views" : listing.user.username}
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</>
	);
}

export default Listing;
