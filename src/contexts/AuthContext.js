import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import slugify from "../utils/slugify";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
	const [auth, setAuth] = useState({ isLoggedIn: false, user: null });
	const navigate = useNavigate();
	const { pathname } = useLocation();

	function login(credentials) {
		// login logic here
		const user = {
			id: 1,
			email: credentials.email,
			username: credentials.username,
			slug: slugify(credentials.username, 1),
			contactDetails: credentials.contactDetails,
		};

		setAuth({ isLoggedIn: true, user: user });
		navigate("/user/profile/" + user.slug);
		console.log("logged in as ", user.username);
	}

	function logout() {
		// logout logic here
		setAuth({ isLoggedIn: false, user: null });
		if (pathname.includes("/user/profile/")) {
			navigate("/");
		}
		console.log("logged out");
	}

	function signup(credentials) {
		// signup logic here

		const user = {
			id: 1,
			email: credentials.email,
			username: credentials.username,
			slug: slugify(credentials.username, 1),
			contactDetails: credentials.contactDetails,
		};

		console.log("welcome ", user.username);
		setAuth({ isLoggedIn: true, user: user });
		navigate("/user/profile/" + user.slug);
	}

	function editDetails(updatedCredentials) {
		// edit profile logic here
		const updatedUser = {
			...auth.user,
			...updatedCredentials,
			slug: slugify(updatedCredentials.username, auth.user.id),
		};

		setAuth({ ...auth, user: updatedUser });
		console.log("Details updated ", updatedUser);
		navigate("/user/profile/" + updatedUser.slug);
	}

	return <AuthContext.Provider value={{ auth, login, logout, signup, editDetails }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	return useContext(AuthContext);
}

export const sampleUser = {
	id: 1,
	email: "info@uzoca.com",
	username: "UZOCA",
	slug: "uzoca-1",
	contactDetails: "+263 7786 566\n+263 7786 566\n+263 7786 566",
};

export default AuthContextProvider;
