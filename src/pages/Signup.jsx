import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as MuiLink, Grid, Button, Typography, Box, useTheme, TextField, CircularProgress } from "@mui/material";
import { PersonAdd, Google, Apple, InfoOutlined } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import GoBack from "../components/GoBack";
import { sampleUser } from "../contexts/AuthContext";

function useSignup() {
	const { auth, signup } = useAuth();
	const [stage, setStage] = useState(1);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [contactDetails, setContactDetails] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate("/");
			alert("You're already logged in!");
			// TODO: implement custom alerts
		}
	}, []);

	function proceed() {
		setStage((prev) => prev + 1);
	}

	function finish() {
		if (email && password && username && contactDetails) {
			setStage((prev) => prev + 1);
			setTimeout(() => {
				signup({ ...sampleUser, email, username, contactDetails });
			}, 2000);
		} else {
			alert("Please enter all details");
		}
	}

	function handleGoogleSignup() {
		setEmail(sampleUser.email);
		setPassword("12345");
		setStage((prev) => prev + 1);
	}

	function handleIcloudSignup() {
		setEmail(sampleUser.email);
		setPassword("12345");
		setStage((prev) => prev + 1);
	}

	return {
		handleGoogleSignup,
		handleIcloudSignup,
		stage,
		proceed,
		finish,
		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
		contactDetails,
		setContactDetails,
	};
}

function Signup() {
	const theme = useTheme();
	const {
		handleGoogleSignup,
		handleIcloudSignup,
		stage,
		proceed,
		finish,
		email,
		setEmail,
		password,
		setPassword,
		username,
		setUsername,
		contactDetails,
		setContactDetails,
	} = useSignup();

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
				{stage !== 3 && (
					<Box sx={{ position: "absolute", top: 0, left: 0, m: 2.5 }}>
						<GoBack />
					</Box>
				)}

				{stage === 3 ? (
					<>
						<CircularProgress />
						<Typography variant="body1" textAlign="center">
							Submitting...Please wait
						</Typography>
					</>
				) : stage === 2 ? (
					<>
						<PersonAdd fontSize="large" />
						<Typography variant="h6">Details</Typography>
						<Typography
							variant="body2"
							color="error"
							sx={{ textAlign: "center", width: "100%", maxWidth: "20rem", p: 1 }}
						>
							<InfoOutlined fontSize="inherit" sx={{ mr: 0.5, mt: -0.1 }} />
							Please fill in the remaining details. We'll include the contact details you provide in all
							of your listings
						</Typography>
						<TextField
							size="small"
							label="Username"
							name="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							sx={{ width: "100%", maxWidth: "20rem", "& .MuiInputBase-root": { borderRadius: "10px" } }}
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
				) : (
					<>
						<PersonAdd fontSize="large" />
						<Typography variant="h6">Signup</Typography>

						<Box sx={{ display: "flex", gap: 1, maxWidth: "20rem", width: "100%" }}>
							<Button
								startIcon={<Google />}
								onClick={handleGoogleSignup}
								color="secondary"
								sx={{
									borderRadius: "20px",
									width: "50%",
									maxWidth: "10rem",
								}}
							>
								Google
							</Button>

							<Button
								startIcon={<Apple />}
								onClick={handleIcloudSignup}
								color="secondary"
								sx={{
									borderRadius: "20px",
									width: "50%",
									maxWidth: "10rem",
								}}
							>
								Apple
							</Button>
						</Box>

						<TextField
							size="small"
							label="Email"
							name="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							sx={{
								width: "100%",
								maxWidth: "20rem",
								"& .MuiInputBase-root": { borderRadius: "10px" },
							}}
						/>

						<TextField
							size="small"
							label="Password"
							name="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							sx={{
								width: "100%",
								maxWidth: "20rem",
								"& .MuiInputBase-root": { borderRadius: "10px" },
							}}
						/>

						<Grid
							container
							spacing={0}
							gap={3}
							alignItems="center"
							justifyContent="space-between"
							sx={{ maxWidth: "20rem", p: 1 }}
						>
							<Grid item xs>
								<Typography variant="body2">
									Already have an account?
									<MuiLink
										component={Link}
										to="/user/login"
										underline="none"
										sx={{ ml: 0.5, "&:hover": { color: "primary.main" } }}
									>
										Login
									</MuiLink>
								</Typography>
							</Grid>

							<Grid item xs="auto">
								<Button size="small" onClick={proceed}>
									Proceed
								</Button>
							</Grid>
						</Grid>
					</>
				)}
			</Box>
		</Box>
	);
}

export default Signup;
