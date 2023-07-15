import { Box, Grid, Typography } from "@mui/material";
import AspectRatioContainer from "./AspectRatioContainer";
import { Link } from "react-router-dom";

function RelatedListing({ listing, width, sx }) {
	return (
		<Box
			component={Link}
			to={`/accomodation/${listing.slug}`}
			sx={{
				color: "text.primary",
				border: "solid thin",
				borderColor: "divider",
				borderRadius: "8px",
				p: 1,
				mb: { xs: 1.5, sm: 2 },
				backgroundColor: "white",
				width: width || "10rem",
				minWidth: "10rem",
				maxWidth: "15rem",
				transition: "all 0.1s ease-in-out",
				"&:hover": { color: "text.primary", backgroundColor: "whitesmoke" },
				...sx,
			}}
		>
			<AspectRatioContainer>
				<img
					src={listing.images[0]}
					alt={listing.title}
					style={{
						borderRadius: "8px",
						width: "100%",
						height: "100%",
						objectFit: "cover",
					}}
				/>
			</AspectRatioContainer>

			<Box
				sx={{
					mt: 1,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					gap: 0.5,
				}}
			>
				<Typography variant="body2" noWrap>
					{listing.title}
				</Typography>

				<Grid container spacing={0} gap={1} alignItems="center" justifyContent="space-between">
					<Grid item xs zeroMinWidth>
						<Typography variant="caption" noWrap sx={{ display: "block" }}>
							{listing.location}
						</Typography>
					</Grid>

					<Grid item xs="auto">
						<Typography
							variant="caption"
							sx={{
								backgroundColor: "primary.main",
								color: "white",
								py: 0.2,
								px: 0.6,
								borderRadius: "5px",
							}}
						>{`$${listing.rent}`}</Typography>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default RelatedListing;
