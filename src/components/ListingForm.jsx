import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import GoBack from "../components/GoBack";
import { CheckCircle, DeleteOutlined, InfoOutlined } from "@mui/icons-material";
import useListingForm from "../hooks/useListingForm";
import ImageInput from "./ImageInput";
import { Link, useNavigate } from "react-router-dom";

function ListingForm() {
	const { formState, dispatch, activeTab, prevTab, nextTab, submitted, editing } = useListingForm();
	const theme = useTheme();
	const navigate = useNavigate();

	function resetImages() {
		dispatch({ type: "images-reset" });
	}

	return (
		<Box
			sx={{
				background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
				minHeight: "100vh",
				display: "flex",
				p: 2,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					backgroundColor: "background.default",
					position: "relative",
					minHeight: "600px",
					maxWidth: "30rem",
					width: "100%",
					px: 2,
					py: 3,
					borderRadius: "10px",
					boxShadow: theme.shadows[5],
					display: "flex",
					gap: 3,
					flexDirection: "column",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				<Box sx={{ position: "absolute", top: 0, left: 0, m: 2.5 }}>
					<GoBack />
				</Box>

				{activeTab !== 4 && (
					<Box
						sx={{
							width: "100%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: 1,
						}}
					>
						<Typography
							variant="body1"
							fontWeight="bold"
							sx={{
								px: 2,
								py: 1.5,
								borderRadius: "100%",
								backgroundColor: "primary.main",
								color: "white",
							}}
						>
							{activeTab}
							<Typography component="span" variant="body2">
								/4
							</Typography>
						</Typography>

						<Typography
							fontWeight="bold"
							sx={{
								maxWidth: "30rem",
								textOverflow: "ellipsis",
								overflow: "hidden",
								whiteSpace: "nowrap",
							}}
						>
							{editing ? <>Editing - {formState.title}</> : "New Listing"}
						</Typography>
					</Box>
				)}

				<Box
					sx={{ minHeight: "40vh", width: "100%", maxWidth: "20rem", display: activeTab === 1 ? "" : "none" }}
				>
					<Typography paragraph textAlign="center">
						<InfoOutlined fontSize="small" /> First, upload images! The first image will be used as the
						cover image.
					</Typography>
					<Grid container spacing={0.5} justifyContent="center">
						{Object.keys(formState.images).map((imageKey) => (
							<Grid key={imageKey} item xs={5} sm={4}>
								<ImageInput
									dispatch={dispatch}
									imageKey={imageKey}
									imageContainer={formState.images[imageKey]}
								/>
							</Grid>
						))}
					</Grid>
					<Typography textAlign="center" sx={{ mt: 2 }}>
						<Button
							onClick={resetImages}
							size="small"
							variant="text"
							color="error"
							endIcon={<DeleteOutlined />}
						>
							Remove All
						</Button>
					</Typography>
				</Box>

				<Box
					sx={{
						minHeight: "40vh",
						width: "100%",
						maxWidth: "20rem",
						display: activeTab === 2 ? "" : "none",
					}}
				>
					<Typography paragraph textAlign="center">
						<InfoOutlined fontSize="small" /> Provide the following details.
					</Typography>

					<TextField
						value={formState.title}
						onChange={(e) => dispatch({ type: "title-changed", options: { value: e.target.value } })}
						size="small"
						label="Title - e.g Comfy Suite"
						name="title"
						sx={{
							width: "100%",
							mb: 3,
							"& .MuiInputBase-root": { borderRadius: "20px" },
						}}
					/>

					<TextField
						value={formState.rent}
						onChange={(e) => dispatch({ type: "rent-changed", options: { value: e.target.value } })}
						size="small"
						label="Rent - USD/month"
						name="rent"
						type="number"
						sx={{
							width: "100%",
							mb: 3,
							"& .MuiInputBase-root": { borderRadius: "20px" },
						}}
					/>

					<TextField
						value={formState.location}
						onChange={(e) => dispatch({ type: "location-changed", options: { value: e.target.value } })}
						size="small"
						label="Location - City & Suburb"
						name="location"
						sx={{ width: "100%", mb: 3, "& .MuiInputBase-root": { borderRadius: "20px" } }}
					/>

					<FormControl size="small" sx={{ mb: 3, width: "100%" }}>
						<InputLabel id="nearest-label">Nearest Institution</InputLabel>
						<Select
							labelId="nearest-label"
							id="nearest-select"
							label="Nearest Institution"
							name="nearest-institution"
							value={formState.nearestInstitution}
							onChange={(e) =>
								dispatch({ type: "nearest-institution-changed", options: { value: e.target.value } })
							}
							fullWidth
						>
							<MenuItem value="uz">University of Zimbabwe</MenuItem>
							<MenuItem value="msu">Midlands State University</MenuItem>
							<MenuItem value="hit">Harare Institute Of Technology</MenuItem>
							<MenuItem value="htc">Harare Teachers College</MenuItem>
							<MenuItem value="htc">Other</MenuItem>
						</Select>
					</FormControl>

					<TextField
						value={formState.distance}
						onChange={(e) => dispatch({ type: "distance-changed", options: { value: e.target.value } })}
						size="small"
						label="Walking Distance - km"
						name="distance"
						type="number"
						sx={{ width: "100%", "& .MuiInputBase-root": { borderRadius: "20px" } }}
					/>
				</Box>

				<Box
					sx={{
						minHeight: "40vh",
						width: "100%",
						maxWidth: "20rem",
						display: activeTab === 3 ? "" : "none",
					}}
				>
					<Typography paragraph textAlign="center">
						<InfoOutlined fontSize="small" /> Further details...
					</Typography>

					<TextField
						value={formState.details}
						onChange={(e) => dispatch({ type: "details-changed", options: { value: e.target.value } })}
						multiline
						rows={10}
						size="small"
						placeholder="Give details about the property, services offered, rooms available etc"
						name="details"
						sx={{
							width: "100%",
							"& .MuiInputBase-root": { borderRadius: "10px" },
						}}
					/>
				</Box>

				<Box
					sx={{
						mb: "auto",
						minHeight: "40vh",
						my: "auto",
						width: "100%",
						maxWidth: "20rem",
						display: activeTab === 4 ? "flex" : "none",
						flexDirection: "column",
						gap: 2,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					{submitted === true ? (
						<>
							<CheckCircle fontSize="large" color="primary" />
							<Typography variant="body1" paragraph textAlign="center">
								{editing ? "Done!" : "Upload successfull!"}
								<br />
								<Button
									size="small"
									onClick={() => navigate(-1)}
									sx={{ "&:hover": { color: "white" }, mt: 2 }}
								>
									Profile
								</Button>
							</Typography>
						</>
					) : (
						<>
							<CircularProgress />
							<Typography variant="body1" textAlign="center">
								Submitting...Please wait
							</Typography>
						</>
					)}
				</Box>

				<Box
					sx={{
						display: activeTab === 4 ? "none" : "flex",
						maxWidth: "20rem",
						justifyContent: "space-between",
						width: "100%",
						mt: 4,
					}}
				>
					<Button disabled={activeTab === 1} variant="outlined" size="small" onClick={prevTab}>
						Back
					</Button>
					<Button size="small" onClick={nextTab}>
						{activeTab === 3 ? "finish" : "Next"}
					</Button>
				</Box>
			</Box>
		</Box>
	);
}

export default ListingForm;
