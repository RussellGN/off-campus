import bh1 from "../images/bh1.jpeg";
import bh2 from "../images/bh2.jpg";
import bh3 from "../images/bh3.png";
import bh4 from "../images/bh4.jpeg";
import bh5 from "../images/bh5.jpg";
import bh6 from "../images/bh6.jpeg";
import bh7 from "../images/bh7.jpg";
import { sampleUser } from "../contexts/AuthContext";
import { useFilters } from "../contexts/FiltersContext";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function useListings() {
	const [listings, setListings] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [pageCount, setPageCount] = useState(1);
	const [page, setPage] = useState(1);
	const filters = useFilters()[0];
	const searchParams = useSearchParams()[0];

	// fetch listings here. dummy fetch as of now
	// fetch and return listings based on filters, q, page, and sort
	useEffect(() => {
		setLoading(true);
		setError(null);
		let timeoutId;
		window.scrollTo(0, 0);

		function fetchListings() {
			timeoutId = setTimeout(() => {
				let requestedItems = "REQUESTED\n ";
				const query = searchParams.get("q");
				const sort = searchParams.get("sort");

				requestedItems += `query: ${query || "none provided"}\n`;
				requestedItems += `sort: ${sort || "popularity"}\n`;

				Object.keys(filters).forEach((filter) => {
					if (filter === "type") {
						Object.keys(filters.type).forEach((type) => {
							if (filters.type[type]) {
								requestedItems += `type: ${type}\n`;
							}
						});
					} else {
						requestedItems += `${filter}: ${filters[filter]}\n`;
					}
				});
				console.log(requestedItems);

				setTitle(query ? `Results for "${query}"` : "All listings");
				setListings(dummyListings);
				setPageCount(3);
				setLoading(false);
			}, 1000);
		}

		fetchListings();

		return () => clearTimeout(timeoutId);
	}, [searchParams, filters, page]);

	return { listings, title, loading, error, page, pageCount, setPage };
}

const images = [bh1, bh2, bh3, bh4, bh5, bh6, bh7];

export const dummyListings = [
	{
		id: 1,
		title: "Comfy suite",
		slug: "comfy-suite-1",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus error quidem in quasi vero commodi autem ullam optio, sint debitis itaque laborum beatae ipsam harum dignissimos est aliquid voluptatibus consequuntur.",
		date: "2023-02-17",
		location: "Mount Pleasant",
		rent: 150,
		nearestTo: "UZ",
		distance: 15,
		user: sampleUser,
		images: images,
	},
	{
		id: 2,
		title: "Room for 2",
		slug: "room-for-2-2",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus error quidem in quasi vero commodi autem ullam optio, sint debitis itaque laborum beatae ipsam harum dignissimos est aliquid voluptatibus consequuntur.",
		date: "2023-01-27",
		location: "Belvedere",
		rent: 250,
		nearestTo: "UZ",
		distance: 5,
		user: sampleUser,
		images: images,
	},
	{
		id: 3,
		title: "Luxury apartment",
		slug: "luxury-apartment-3",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus error quidem in quasi vero commodi autem ullam optio, sint debitis itaque laborum beatae ipsam harum dignissimos est aliquid voluptatibus consequuntur.",
		date: "2023-03-11",
		location: "Avenues",
		rent: 300,
		nearestTo: "MSU Harare",
		distance: 7,
		user: sampleUser,
		images: images,
	},
	{
		id: 4,
		title: "Girls' boarding house",
		slug: "girls-boarding-house-4",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus error quidem in quasi vero commodi autem ullam optio, sint debitis itaque laborum beatae ipsam harum dignissimos est aliquid voluptatibus consequuntur.",
		date: "2023-02-06",
		location: "Mount Pleasant",
		rent: 170,
		nearestTo: "UZ",
		distance: 40,
		user: sampleUser,
		images: images,
	},
	{
		id: 5,
		title: "Room to share",
		slug: "room-to-share-5",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus error quidem in quasi vero commodi autem ullam optio, sint debitis itaque laborum beatae ipsam harum dignissimos est aliquid voluptatibus consequuntur.",
		date: "2023-04-01",
		location: "Mabelreign",
		rent: 90,
		nearestTo: "HIT",
		distance: 20,
		user: sampleUser,
		images: images,
	},
];

export const sampleListing = {
	images: {
		image1: null,
		image2: null,
		image3: null,
		image4: null,
		image5: null,
		image6: null,
		image7: null,
		image8: null,
		image9: null,
		image10: null,
		image11: null,
		image12: null,
	},
	title: "Room for 3 girls",
	rent: "230",
	location: "Belvedere",
	nearestInstitution: "uz",
	distance: "23",
	details: "Nice place",
};

export default useListings;
