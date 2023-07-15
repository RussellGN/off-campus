import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useScrollToTop() {
	const { pathname } = useLocation();

	useEffect(() => {
		// implement logic to prevent scroll to top when switching from view-accomodtion page to accomodation listings page
		// let prevPath = pathname

		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default useScrollToTop;
