import { HotelOutlined, KeyboardArrowRight } from "@mui/icons-material";
import { Box, styled, Button, Container, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import HeroGraphic from "../components/HeroGraphic";
import { imagesDescriptive } from "../static-images/images";

const StyledImage = styled("img")({
	position: "absolute",
});

function Hero() {
	const theme = useTheme();
	const isTablet = useMediaQuery(`(max-width: ${theme.breakpoints.values.md}px) `);

	return (
		<Container sx={{ p: isTablet ? "0 !important" : "" }}>
			<Box
				sx={{
					py: 7,
					backgroundColor: "primary.main",
					borderBottom: `solid 10px ${theme.palette.secondary.main}`,
					boxShadow: `0px 5px 10px ${theme.palette.secondary.main}`,
					textAlign: { xs: "center", md: "left" },
				}}
			>
				<Grid
					container
					spacing={0}
					gap={4}
					alignItems="center"
					justifyContent="center"
					sx={{ minHeight: { md: "50vh" } }}
				>
					<Grid item xs={12} md={5} order={{ xs: 2, md: 1 }}>
						<Box sx={{ px: 3, color: "white" }}>
							<Typography variant="h4" sx={{ mb: { xs: 2, md: 3 } }}>
								No{" "}
								<span style={{ textShadow: "1px 1px 2px black", color: theme.palette.secondary.main }}>
									Res
								</span>
								? No{" "}
								<span style={{ textShadow: "1px 1px 2px black", color: theme.palette.secondary.main }}>
									{" "}
									Problem
								</span>
							</Typography>
							<Typography variant="h6" sx={{ mb: { xs: 2, md: 3 }, maxWidth: "30rem", mx: "auto" }}>
								Browse and filter{" "}
								<span style={{ textShadow: "1px 1px 2px black", color: theme.palette.secondary.main }}>
									{" "}
									50+
								</span>{" "}
								Boarding houses and apartments available exclusively to students in Harare
							</Typography>
							<Button
								component={Link}
								to="/accomodation"
								sx={{
									backgroundColor: "white !important",
									color: "rgb(20,20,20) !important",
									border: "solid 5px transparent",
									transition: "all 0.15s ease-in-out",
									"&:hover": {
										borderColor: theme.palette.secondary.main,
									},
								}}
							>
								Browse Accomodation
							</Button>
						</Box>
					</Grid>

					<Grid item xs={12} md={4} order={{ xs: 1, md: 2 }}>
						<Box sx={{ px: 2 }}>
							<HeroGraphic />
						</Box>
					</Grid>
				</Grid>
			</Box>
		</Container>
	);
}

function Home() {
	return (
		<>
			<Hero />

			<Container>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						gap: 2,
						my: 10,
						textAlign: "center",
					}}
				>
					<HotelOutlined color="secondary" sx={{ fontSize: "5rem" }} />
					<Typography variant="h5">Landlords & Agencies</Typography>
					<Typography paragraph>
						Do you have accomodation to advertise? Create a free account <br /> and upload your listings.
						<br />
						<Button
							component={Link}
							to="/user/signup"
							sx={{ "&:hover": { color: "white" }, mt: 2 }}
							endIcon={<KeyboardArrowRight />}
						>
							Signup
						</Button>
					</Typography>
				</Box>

				<Cta />
			</Container>
		</>
	);
}

function Cta() {
	const theme = useTheme();

	return (
		<Box
			sx={{
				borderRadius: "15px",
				px: 4,
				py: 8,
				overflow: "hidden",
				backgroundColor: theme.palette.secondary.main,
				position: "relative",
			}}
		>
			<StyledImage
				src={imagesDescriptive.apartments}
				alt="vehicles"
				sx={{
					right: "10%",
					top: { xs: "18%", sm: "0%" },
					width: "30rem",
				}}
			/>
			<Box sx={{ textAlign: { xs: "center", sm: "left" }, position: "relative" }}>
				<Typography variant="h5">Now Lets find a place to stay </Typography>
				<Button
					component={Link}
					to="/accomodation"
					sx={{ "&:hover": { color: "white" }, mt: 2 }}
					endIcon={<KeyboardArrowRight />}
				>
					Browse Accomdation
				</Button>
			</Box>
		</Box>
	);
}

export default Home;
