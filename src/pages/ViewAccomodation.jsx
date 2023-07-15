import { useParams } from "react-router-dom";
import { dummyListings } from "../hooks/useListings";
import { Box, Grid, useTheme, Typography } from "@mui/material";
import { Place, DirectionsWalk, AttachMoney, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import friendlyDate from "../utils/friendlyDate";
import GoBack from "../components/GoBack";
import AspectRatioContainer from "../components/AspectRatioContainer";
import { useState } from "react";
import { styled } from "@mui/system";
import RelatedListings from "../components/RelatedListings";

const StyledButton = styled("button")({
	borderRadius: "100%",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	padding: "0.5rem",
	border: "0",
	color: "white",
	backgroundColor: "rgba(0,0,0,0.3)",
	transition: "all 0.2s ease-in-out",
	"&:hover": {
		backgroundColor: "rgba(0,0,0,0.5)",
	},
});

const StyledImg = styled("img")({
	width: "100%",
	height: "100%",
	objectFit: "cover",
	transition: "all 0.05s",
	borderRadius: "8px",
	cursor: "pointer",
	"&:hover": {
		opacity: "1 !important",
	},
});

function ViewAccomodation() {
	const [imageOnView, setImageOnView] = useState(0);
	const { slug } = useParams();
	const listing = dummyListings.find((item) => item.slug === slug);
	const theme = useTheme();

	return (
		<>
			<GoBack />

			<Box sx={{ minHeight: "60vh" }}>
				<Grid container spacing={0}>
					<Grid item xs={12} md={7}>
						<div>
							<Box sx={{ position: "relative" }}>
								<Box
									sx={{
										position: "absolute",
										top: "50%",
										left: "0",
										transform: "translateY(-50%)",
										width: "100%",
										height: "fit-content",
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
										p: 1,
									}}
								>
									<StyledButton
										onClick={() =>
											setImageOnView((prev) =>
												prev === 0 ? listing.images.length - 1 : prev - 1
											)
										}
									>
										<KeyboardArrowLeft />
									</StyledButton>
									<StyledButton
										onClick={() =>
											setImageOnView((prev) =>
												prev === listing.images.length - 1 ? 0 : prev + 1
											)
										}
									>
										<KeyboardArrowRight />
									</StyledButton>
								</Box>

								<AspectRatioContainer>
									<img
										src={listing.images[imageOnView]}
										alt={listing.title}
										style={{
											width: "100%",
											height: "100%",
											borderRadius: "10px",
											border: "solid thin",
											borderColor: theme.palette.divider,
											objectFit: "cover",
										}}
									/>
								</AspectRatioContainer>
							</Box>

							<Box sx={{ display: "flex", gap: 0.4, py: 1, overflow: "auto" }}>
								{listing.images.map((image, index) => (
									<Box key={index} sx={{ width: "20%", minWidth: "5rem" }}>
										<AspectRatioContainer>
											<StyledImg
												onClick={() => setImageOnView(index)}
												src={image}
												alt={listing.title}
												style={{
													opacity: imageOnView === index ? "1" : "0.8",
													border: "solid thin",
													borderColor: theme.palette.divider,
												}}
											/>
										</AspectRatioContainer>
									</Box>
								))}
							</Box>
						</div>
					</Grid>

					<Grid item xs={12} md={5}>
						<Box
							sx={{
								p: { xs: 1, sm: 3 },
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
								<Typography variant="body1" sx={{ mb: 1.5 }}>
									<Place fontSize="small" sx={{ mr: 0.2 }} />
									{listing.location}
								</Typography>

								<Typography variant="body1" sx={{ mb: 1.5 }}>
									<DirectionsWalk fontSize="small" sx={{ mr: 0.2 }} />
									{`${listing.distance} km to ${listing.nearestTo}`}
								</Typography>

								<Typography variant="body1" sx={{ mb: 1.5 }}>
									<AttachMoney fontSize="small" sx={{ mr: 0.2 }} />
									{`${listing.rent} / month`}
								</Typography>

								<Typography
									variant="body1"
									sx={{ mb: 1.5, backgroundColor: "divider", p: 1.5, borderRadius: "5px" }}
								>
									{listing.description}
								</Typography>

								<Box sx={{ display: "flex", alignItems: "flex-start", mb: 1.5, gap: 1 }}>
									<Typography
										variant="body1"
										sx={{
											backgroundColor: "divider",
											p: 1.5,
											borderRadius: "5px",
										}}
									>
										{listing.user.username}
									</Typography>
									<Typography
										variant="body1"
										sx={{
											backgroundColor: "divider",
											p: 1.5,
											borderRadius: "5px",
										}}
									>
										{listing.user.contactDetails}
									</Typography>
								</Box>
							</div>
						</Box>
					</Grid>
				</Grid>

				<RelatedListings />
			</Box>
		</>
	);
}

export default ViewAccomodation;
