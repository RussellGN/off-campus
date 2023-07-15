import { Box, Typography } from "@mui/material";
import { dummyListings } from "../hooks/useListings";
import RelatedListing from "./RelatedListing";

function RelatedListings() {
	return (
		<>
			<Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
				Related
			</Typography>
			<Box sx={{ backgroundColor: "divider", p: { xs: 1.5, sm: 2 }, pb: "0 !important", borderRadius: "10px" }}>
				<Box sx={{ display: "flex", gap: 1.5, overflow: "auto" }}>
					{dummyListings?.map((listing) => (
						<RelatedListing width="15%" key={listing.id} listing={listing} />
					))}
				</Box>
			</Box>
		</>
	);
}

export default RelatedListings;
