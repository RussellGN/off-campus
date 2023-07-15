import { useReducer, createContext, useContext } from "react";

const FiltersContext = createContext({});

export default function FiltersContextProvider({ children }) {
	const [filters, dispatch] = useReducer(filtersReducer, {
		nearest: "any",
		distance: 90,
		price: "any",
		type: {
			apartment: false,
			boarding: false,
			cottage: false,
			house: false,
		},
	});

	return <FiltersContext.Provider value={[filters, dispatch]}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
	return useContext(FiltersContext);
}

function filtersReducer(state, action) {
	switch (action.type) {
		case "nearest-changed":
			return { ...state, nearest: action.options.value };
		case "distance-changed":
			return { ...state, distance: action.options.value };
		case "price-changed":
			return { ...state, price: action.options.value };
		case "type-changed":
			return { ...state, type: { ...state.type, [action.options.key]: action.options.value } };
		default:
			throw Error("Unknown dispatch action for filters state: " + action.type);
	}
}
