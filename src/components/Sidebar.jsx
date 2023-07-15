import { Close } from "@mui/icons-material";
import {
	Slider,
	Radio,
	IconButton,
	Typography,
	Checkbox,
	FormControlLabel,
	FormGroup,
	RadioGroup,
	Box,
	useTheme,
	FormControl,
	Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useFilters } from "../contexts/FiltersContext";
import useIsMobile from "../hooks/useIsMobile";

function Sidebar({ setShowMobileFilters }) {
	const theme = useTheme();
	const [filters, dispatch] = useFilters();
	const isMobile = useIsMobile();

	return (
		<Box
			sx={{
				border: "solid thin",
				borderColor: "divider",
				boxShadow: isMobile ? "" : theme.shadows[5],
				borderRadius: isMobile ? 0 : "8px",
				mb: 5,
				p: 2.5,
				position: isMobile ? "fixed" : "sticky",
				top: isMobile ? "0" : "90px",
				left: isMobile ? "0" : "",
				height: isMobile ? "100vh" : "78vh",
				width: isMobile ? "100vw" : "100%",
				overflow: "auto",
				backgroundColor: isMobile ? "background.default" : "",
				zIndex: isMobile ? 100000 : "",
			}}
		>
			<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
				<Typography variant="h5" sx={{ mb: 2.5 }}>
					Filters
				</Typography>
				<IconButton
					size="small"
					onClick={() => setShowMobileFilters(false)}
					sx={{ display: isMobile ? "" : "none" }}
				>
					<Close />
				</IconButton>
			</Box>
			<Chips filters={filters} />
			<NearestFilter value={filters.nearest} dispatch={dispatch} />
			<DistanceFilter value={filters.distance} dispatch={dispatch} />
			<PriceFilter value={filters.price} dispatch={dispatch} />
			<TypeFilter value={filters.type} dispatch={dispatch} />
			<MuiLink
				variant="body2"
				to="/contact"
				underline="hover"
				component={Link}
				sx={{ width: "100%", textAlign: "center", "&:hover": { color: "primary.main" }, display: "block" }}
			>
				Suggest filters
			</MuiLink>
		</Box>
	);
}

function Chips({ filters }) {
	const chipTitles = [];

	Object.keys(filters).forEach((filter) => {
		if (filters[filter] === "any") return;
		switch (filter) {
			case "nearest":
				chipTitles.push({ filter: filter, value: `near to ${filters[filter]}` });
				return;
			case "price":
				chipTitles.push({ filter: filter, value: `$ ${filters[filter]} rent` });
				return;
			case "distance":
				chipTitles.push({ filter: filter, value: `${filters[filter]} km walking distance` });
				return;
			case "type":
				Object.keys(filters[filter]).forEach((type) => {
					if (filters[filter][type]) {
						chipTitles.push({ filter: filter, value: type });
					}
				});
				return;
			default:
				throw Error("Error encountered generating chips titles. Filter name: " + filter);
		}
	});

	return (
		<Box sx={{ mb: 2.5, pb: 1, px: 1, display: "flex", alignItems: "center", gap: 1, overflow: "auto" }}>
			{chipTitles.map((item) => (
				<Typography
					variant="caption"
					key={item.filter + "-" + item.value}
					sx={{
						borderRadius: "5px",
						width: "fit-content",
						py: 0.2,
						px: 1,
						whiteSpace: "nowrap",
						backgroundColor: "divider",
					}}
				>
					{item.value}
				</Typography>
			))}
		</Box>
	);
}

function NearestFilter({ value, dispatch }) {
	return (
		<Box sx={filterStyles}>
			<Typography variant="body1">Nearest institution</Typography>

			<FormControl>
				<RadioGroup
					name="nearest"
					value={value}
					onChange={(e, value) => dispatch({ type: "nearest-changed", options: { value: value } })}
				>
					<FormControlLabel label="Any" value="any" control={<Radio size="small" />} />
					<FormControlLabel label="UZ" value="uz" control={<Radio size="small" />} />
					<FormControlLabel label="MSU Harare" value="msu" control={<Radio size="small" />} />
					<FormControlLabel label="HIT" value="hit" control={<Radio size="small" />} />
				</RadioGroup>
			</FormControl>
		</Box>
	);
}

function DistanceFilter({ value, dispatch }) {
	return (
		<Box sx={filterStyles}>
			<Typography variant="body1">Walking Distance</Typography>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Slider
					min={10}
					max={90}
					step={5}
					sx={{ flexGrow: 1 }}
					value={value}
					onChange={(e, value) => dispatch({ type: "distance-changed", options: { value: value } })}
				/>
				<Typography variant="body2" sx={{ whiteSpace: "nowrap", pl: 3 }}>
					{`0-${value}km`}
				</Typography>
			</Box>
		</Box>
	);
}

function PriceFilter({ value, dispatch }) {
	return (
		<Box sx={filterStyles}>
			<Typography variant="body1">Rent (monthly)</Typography>

			<FormControl>
				<RadioGroup
					name="nearest"
					value={value}
					onChange={(e, value) => dispatch({ type: "price-changed", options: { value: value } })}
				>
					<FormControlLabel label="Any" value="any" control={<Radio size="small" />} />
					<FormControlLabel label="$0-100" value="0-100" control={<Radio size="small" />} />
					<FormControlLabel label="$100-200" value="100-200" control={<Radio size="small" />} />
					<FormControlLabel label="$200-300" value="200-300" control={<Radio size="small" />} />
					<FormControlLabel label="$300+" value="300+" control={<Radio size="small" />} />
				</RadioGroup>
			</FormControl>
		</Box>
	);
}

function TypeFilter({ value: types, dispatch }) {
	function handleChange(e, checked) {
		dispatch({ type: "type-changed", options: { key: e.target.name, value: checked } });
	}
	return (
		<Box sx={filterStyles}>
			<Typography variant="body1">Type</Typography>
			<FormGroup>
				<FormControlLabel
					label="Apartment"
					name="apartment"
					onChange={handleChange}
					checked={types.apartment}
					disabled={types.any}
					control={<Checkbox size="small" />}
				/>
				<FormControlLabel
					label="Boarding House"
					name="boarding"
					onChange={handleChange}
					checked={types.boarding}
					disabled={types.any}
					control={<Checkbox size="small" />}
				/>
				<FormControlLabel
					label="Cottage"
					name="cottage"
					onChange={handleChange}
					checked={types.cottage}
					disabled={types.any}
					control={<Checkbox size="small" />}
				/>
				<FormControlLabel
					label="House"
					name="house"
					onChange={handleChange}
					checked={types.house}
					disabled={types.any}
					control={<Checkbox size="small" />}
				/>
			</FormGroup>
		</Box>
	);
}

const filterStyles = {
	border: "solid thin",
	borderColor: "divider",
	borderRadius: "10px",
	p: 2,
	mb: 2,
};

export default Sidebar;
