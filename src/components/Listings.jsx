import useListings from "../hooks/useListings";
import Listing from "./Listing";
import { Box, Typography, CircularProgress, Pagination } from "@mui/material";
import { WarningRounded } from "@mui/icons-material";

function Listings() {
	const { listings, title, loading, error, page, pageCount, setPage } = useListings();

	if (loading) {
		return (
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
		);
	}

	if (error) {
		return (
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
		);
	}

	if (listings.length === 0) {
		return (
			<Typography paragraph textAlign="center" sx={{ mt: 3 }}>
				<WarningRounded sx={{ color: "divider", mr: 0.4 }} />
				No listings yet. Check back later!
			</Typography>
		);
	}

	return (
		<>
			<Typography variant="h5" textAlign="center" sx={{ my: 4 }}>
				{title}
			</Typography>

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
	);
}

export default Listings;
