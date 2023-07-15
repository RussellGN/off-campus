import { useState, useReducer, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { sampleListing } from "../hooks/useListings";

function useListingForm() {
	const [formState, dispatch] = useReducer(stateReducer, {
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
		title: "",
		rent: "",
		location: "",
		nearestInstitution: "uz",
		distance: "",
		details: "",
	});
	const [activeTab, setActiveTab] = useState(1);
	const [submitted, setSubmitted] = useState(false);
	const { pathname } = useLocation();
	const { slug } = useParams();
	const editing = pathname.includes("/edit-listing");

	function prevTab() {
		setActiveTab((prev) => prev - 1);
	}

	function nextTab() {
		setActiveTab((prev) => prev + 1);

		if (activeTab === 3) {
			submit();
		}
	}

	function submit() {
		console.log("submitting");
		setTimeout(() => {
			if (editing) {
				console.log("edited!\n", formState);
			} else {
				console.log("submitted!\n", formState);
			}
			setSubmitted(true);
		}, 5000);
	}

	useEffect(() => {
		function fetchListing(slug) {
			return sampleListing;
		}

		if (editing) {
			dispatch({ type: "listing-retreived-for-editing", options: { listing: fetchListing(slug) } });
		}
	}, []);

	return {
		formState,
		dispatch,
		activeTab,
		prevTab,
		nextTab,
		submitted,
		editing,
	};
}

function stateReducer(state, action) {
	switch (action.type) {
		case "images-reset":
			return {
				...state,
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
			};
		case "listing-retreived-for-editing":
			return action.options.listing;
		case "images-changed":
			return { ...state, images: { ...state.images, [action.options.key]: action.options.value } };
		case "title-changed":
			return { ...state, title: action.options.value };
		case "rent-changed":
			return { ...state, rent: action.options.value };
		case "location-changed":
			return { ...state, location: action.options.value };
		case "nearest-institution-changed":
			return { ...state, nearestInstitution: action.options.value };
		case "distance-changed":
			return { ...state, distance: action.options.value };
		case "details-changed":
			return { ...state, details: action.options.value };
		default:
			throw Error("Unkown action type dispatched: " + action.type);
	}
}

export default useListingForm;
