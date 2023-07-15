import { ArrowBack, HomeOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function GoBack({ buttonProps }) {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	if (pathname.includes("/login") || pathname.includes("/signup")) {
		return (
			<Box sx={{ my: 2 }}>
				<IconButton size="small" sx={{ border: "solid thin" }} onClick={() => navigate("/")} title="Homepage">
					<HomeOutlined />
				</IconButton>
			</Box>
		);
	}

	return (
		<Box sx={{ my: 2 }}>
			<IconButton size="small" sx={{ border: "solid thin" }} onClick={() => navigate(-1)} title="go back">
				<ArrowBack />
			</IconButton>
		</Box>
	);
}

export default GoBack;
