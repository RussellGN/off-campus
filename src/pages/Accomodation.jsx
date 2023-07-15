import { Grid, Box } from "@mui/material";
import SearchSortControls from "../components/SearchSortControls";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Listings from "../components/Listings";
import FiltersContextProvider from "../contexts/FiltersContext";

function Accomodation() {
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	return (
		<FiltersContextProvider>
			<Grid container gap={4} sx={{ minHeight: "60vh" }}>
				<Grid item md={3} sx={{ display: { xs: showMobileFilters ? "block" : "none", md: "block" } }}>
					<Sidebar setShowMobileFilters={setShowMobileFilters} />
				</Grid>
				<Grid item xs={12} md>
					<Box>
						<SearchSortControls setShowMobileFilters={setShowMobileFilters} />
						<Listings />
					</Box>
				</Grid>
			</Grid>
		</FiltersContextProvider>
	);
}

export default Accomodation;
