import React from "react";
import AnimatedRoutes from "./components/AnimatedRoutes";
import MyThemeProvider from "./components/Theme";
import AuthContextProvider from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import useScrollToTop from "./hooks/useScrollToTop";

function App() {
	return (
		<BrowserRouter basename="/off-campus">
			<MyThemeProvider>
				<AuthContextProvider>
					<Navbar />
					<ContentContainer />
					<Container>
						<Footer />
					</Container>
				</AuthContextProvider>
			</MyThemeProvider>
		</BrowserRouter>
	);
}

function ContentContainer() {
	// had to create this in order to ommit container when pathname is 'sigin' or 'login'
	// as well as to call useScrollToTop

	const { pathname } = useLocation();

	useScrollToTop();

	let showContainer = true;
	["signup", "login", "user/create-listing", "user/edit-profile", "user/edit-listing"].forEach((route) => {
		if (pathname.includes(route)) {
			showContainer = false;
		}
	});

	if (pathname === "/") {
		showContainer = false;
	}

	if (!showContainer) {
		return (
			<>
				<AnimatedRoutes />
			</>
		);
	}

	return (
		<Container>
			<AnimatedRoutes />
		</Container>
	);
}

export default App;
