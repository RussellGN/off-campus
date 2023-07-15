import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Typography, Box, useTheme, TextField, CircularProgress } from "@mui/material";
import { PersonAdd, CheckCircle } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import GoBack from "../components/GoBack";

function useEditProfile() {
	const { auth, editDetails } = useAuth();
	const [stage, setStage] = useState(1);
	const navigate = useNavigate();
	const [username, setUsername] = useState(auth?.user?.username);
	const [contactDetails, setContactDetails] = useState(auth?.user?.contactDetails);

	useEffect(() => {
		if (!auth.isLoggedIn) {
			console.log("You're not logged in!");
			navigate("/");
			// TODO: implement custom alerts
		}
	}, []);

	function proceed() {
		setStage((prev) => prev + 1);
	}

	function finish() {
		setStage((prev) => prev + 1);
		setTimeout(() => {
			editDetails({ username, contactDetails });
		}, 2000);
	}

	return {
		username,
		setUsername,
		contactDetails,
		setContactDetails,
		stage,
		proceed,
		finish,
		profileURL: auth.user?.slug,
	};
}

function EditProfile() {
	const theme = useTheme();
	const { username, setUsername, contactDetails, setContactDetails, stage, proceed, finish, profileURL } =
		useEditProfile();

	return (
		<Box
			sx={{
				background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
				minHeight: "100vh",
				height: "100%",
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
					minHeight: "50vh",
					maxWidth: "30rem",
					width: "100%",
					px: 2,
					py: 6,
					borderRadius: "10px",
					boxShadow: theme.shadows[5],
					display: "flex",
					gap: 2,
					flexDirection: "column",
					justifyContent: "space-around",
					alignItems: "center",
				}}
			>
				{stage === 1 ? (
					<>
						<Box sx={{ position: "absolute", top: 0, left: 0, m: 2.5 }}>
							<GoBack />
						</Box>
						<PersonAdd fontSize="large" />
						<Typography variant="h6">Edit Details</Typography>
						<TextField
							size="small"
							label="Username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							sx={{ width: "100%", maxWidth: "20rem", "& .MuiInputBase-root": { borderRadius: "20px" } }}
						/>
						<TextField
							size="small"
							multiline
							rows={3}
							label="Contact details"
							name="contact-details"
							value={contactDetails}
							onChange={(e) => setContactDetails(e.target.value)}
							sx={{ width: "100%", maxWidth: "20rem", "& .MuiInputBase-root": { borderRadius: "10px" } }}
						/>
						<Box sx={{ textAlign: "right", maxWidth: "20rem", p: 1 }}>
							<Button size="small" onClick={finish}>
								Finish
							</Button>
						</Box>
					</>
				) : stage === 2 ? (
					<>
						<CircularProgress />
						<Typography variant="body1" textAlign="center">
							Submitting...Please wait
						</Typography>
					</>
				) : (
					<>
						<CheckCircle fontSize="large" color="primary" />
						<Typography variant="body1" paragraph textAlign="center">
							Details updated! <br />
							<Button
								size="small"
								component={Link}
								to={profileURL}
								sx={{ "&:hover": { color: "white" }, mt: 2 }}
							>
								Go to profile
							</Button>
						</Typography>
					</>
				)}
			</Box>
		</Box>
	);
}

export default EditProfile;
