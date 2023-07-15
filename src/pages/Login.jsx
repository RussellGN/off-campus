import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as MuiLink, Grid, Button, Typography, Box, useTheme, TextField } from "@mui/material";
import { Person, Google, Apple } from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import GoBack from "../components/GoBack";
import { sampleUser } from "../contexts/AuthContext";

function useLogin() {
	const { auth, login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate("/");
			alert("You're already logged in!");
			// TODO: implement custom alerts
		}
	}, []);

	function handleLogin() {
		if (email && password) {
			login({ ...sampleUser, email });
		} else {
			alert("please enter the required details");
		}
	}

	function handleGoogleLogin() {
		login(sampleUser);
	}

	function handleIcloudLogin() {
		login(sampleUser);
	}

	return { email, setEmail, password, setPassword, handleLogin, handleGoogleLogin, handleIcloudLogin };
}

function Login() {
	const theme = useTheme();
	const { email, setEmail, password, setPassword, handleLogin, handleGoogleLogin, handleIcloudLogin } = useLogin();

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
				<Box sx={{ position: "absolute", top: 0, left: 0, m: 2.5 }}>
					<GoBack />
				</Box>
				<Person fontSize="large" />
				<Typography variant="h6">Login</Typography>

				<Box sx={{ display: "flex", gap: 1, maxWidth: "20rem", width: "100%" }}>
					<Button
						startIcon={<Google />}
						onClick={handleGoogleLogin}
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
						onClick={handleIcloudLogin}
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
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					label="Email"
					name="email"
					type="email"
					sx={{ width: "100%", maxWidth: "20rem", "& .MuiInputBase-root": { borderRadius: "10px" } }}
				/>

				<TextField
					size="small"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					label="Password"
					name="password"
					type="password"
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
							Don't have an account?
							<MuiLink
								component={Link}
								to="/user/signup"
								underline="none"
								sx={{ ml: 0.5, "&:hover": { color: "primary.main" } }}
							>
								Signup
							</MuiLink>
						</Typography>
					</Grid>

					<Grid item xs="auto">
						<Button size="small" onClick={handleLogin}>
							Login
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
}

export default Login;
