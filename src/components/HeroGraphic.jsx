import { dummyListings } from "../hooks/useListings";
import { Box, Typography } from "@mui/material";
import AspectRatioContainer from "./AspectRatioContainer";
import { Place } from "@mui/icons-material";

function HeroGraphic() {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<HomeListing listing={dummyListings[0]} sx={{ position: "relative", right: "-4rem" }} />
			<HomeListing listing={dummyListings[1]} sx={{ position: "relative", zIndex: 2, transform: "scale(1.2)" }} />
			<HomeListing listing={dummyListings[2]} sx={{ position: "relative", left: "-4rem" }} />
		</Box>
	);
}

function HomeListing({ listing, sx }) {
	return (
		<Box
			sx={{
				display: "block",
				color: "text.primary",
				border: "solid thin",
				borderColor: "divider",
				borderRadius: "8px",
				p: 1,
				mb: { xs: 1.5, sm: 2 },
				backgroundColor: "background.default",
				minWidth: { xs: "9rem", md: "10rem" },
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
					textAlign: "center",
				}}
			>
				<Typography variant="body2" noWrap>
					{listing.title}
				</Typography>

				<Typography
					variant="caption"
					sx={{
						display: "block",
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						width: "100%",
					}}
				>
					<Place fontSize="inherit" color="inherit" sx={{ mt: -0.1, mr: 0.2 }} />
					{listing.location}
					{/* {`${listing.location}, ${listing.distance}km to ${listing.nearestTo}`} */}
				</Typography>

				<Typography
					variant="caption"
					sx={{
						backgroundColor: "primary.main",
						color: "white",
						py: 0.2,
						px: 2,
						pb: 0.2,
						borderRadius: "8px",
						width: "fit-content",
						mx: "auto",
					}}
				>{`$${listing.rent}`}</Typography>

				{/* <Grid container spacing={0} gap={1} alignItems="center" justifyContent="space-between">
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
				</Grid> */}
			</Box>
		</Box>
	);
}

export default HeroGraphic;
