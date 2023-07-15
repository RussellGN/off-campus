import { dummyListings } from "./useListings";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function useProfileListings() {
	const [listings, setListings] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [pageCount, setPageCount] = useState(1);
	const [page, setPage] = useState(1);
	const { slug } = useParams();

	useEffect(() => {
		setLoading(true);
		setError(null);
		let timeoutId;
		window.scrollTo(0, 0);

		function fetchListings() {
			timeoutId = setTimeout(() => {
				console.log(`REQUESTED\n slug: ${slug}`);
				setListings(dummyListings);
				setPageCount(3);
				setLoading(false);
			}, 1000);
		}

		fetchListings();
		return () => clearTimeout(timeoutId);
	}, [slug, page]);

	return { listings, loading, error, page, pageCount, setPage };
}

export default useProfileListings;
