import { TuneSharp, ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { FormControl, InputLabel, Button, MenuItem, TextField, Select, Box } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";

function useControls() {
	const [searchParams, setSearchParams] = useSearchParams();

	function onSortChange(e) {
		if (searchParams.get("q")) {
			setSearchParams((prev) => {
				return { q: prev.get("q"), sort: e.target.value };
			});
		} else {
			setSearchParams({ sort: e.target.value });
		}
	}

	function onQueryKeyDown(e) {
		if (e.which === 13) {
			if (e.target.value === "") {
				// if there's nothing in the searchbar, do nothing
				return;
			}
			setSearchParams({ q: e.target.value });
			e.target.value = "";
			e.target.blur();
		}
	}

	return { searchParams, onSortChange, onQueryKeyDown };
}

function SearchSortControls({ setShowMobileFilters }) {
	const { searchParams, onSortChange, onQueryKeyDown } = useControls();
	const isMobile = useIsMobile();

	return (
		<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1 }}>
			<Button onClick={() => setShowMobileFilters(true)} size="small" sx={{ display: isMobile ? "" : "none" }}>
				<TuneSharp />
			</Button>

			<TextField
				onKeyDown={onQueryKeyDown}
				size={isMobile ? "small" : "medium"}
				label="Search"
				name="q"
				variant="outlined"
				type="search"
				placeholder="Search"
				sx={{ flexGrow: 1, "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
			/>

			<FormControl size={isMobile ? "small" : "medium"}>
				<InputLabel id="sort-label">Sort</InputLabel>
				<Select
					labelId="sort-label"
					id="sort-select"
					label="Sort"
					name="sort"
					value={searchParams.get("sort") || "popularity"}
					onChange={onSortChange}
					autoWidth
				>
					<MenuItem value="popularity">Popularity</MenuItem>
					<MenuItem value="date-des">
						Date <ArrowDownward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
					</MenuItem>
					<MenuItem value="date-asc">
						Date <ArrowUpward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
					</MenuItem>
					<MenuItem value="cost-asc">
						Cost
						<ArrowUpward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
					</MenuItem>
					<MenuItem value="cost-des">
						Cost
						<ArrowDownward fontSize="small" color="inherit" sx={{ ml: 0.2 }} />
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}

export default SearchSortControls;
