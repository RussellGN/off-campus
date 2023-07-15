import { motion, AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Accomodation from "../pages/Accomodation";
import ViewAccomodation from "../pages/ViewAccomodation";
import Page404 from "../pages/Page404";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ListingForm from "./ListingForm";
import EditProfile from "../pages/EditProfile";
import useScrollToTop from "../hooks/useScrollToTop";

function AnimatedRoutes() {
	const { pathname } = useLocation();
	useScrollToTop();

	return (
		<AnimatePresence key={pathname}>
			<Routes>
				<Route path="/" element={<AnimatedRoute children={<Home />} />} />
				<Route path="/accomodation" element={<AnimatedRoute children={<Accomodation />} />} />
				<Route path="/accomodation/:slug" element={<AnimatedRoute children={<ViewAccomodation />} />} />
				<Route path="/user/profile/:slug" element={<AnimatedRoute children={<Profile />} />} />
				<Route path="/user/signup" element={<AnimatedRoute children={<Signup />} />} />
				<Route path="/user/login" element={<AnimatedRoute children={<Login />} />} />
				<Route path="/user/create-listing" element={<AnimatedRoute children={<ListingForm />} />} />
				<Route path="/user/edit-listing/:slug" element={<AnimatedRoute children={<ListingForm />} />} />
				<Route path="/user/edit-profile/:slug" element={<AnimatedRoute children={<EditProfile />} />} />
				<Route path="/about" element={<AnimatedRoute children={<Page404 />} />} />
				<Route path="/contact" element={<AnimatedRoute children={<Page404 />} />} />
				<Route path="*" element={<AnimatedRoute children={<Page404 />} />} />
			</Routes>
		</AnimatePresence>
	);
}

function AnimatedRoute({ children }) {
	return (
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transitionDuration: "0.3s" }} exit={{ opacity: 0 }}>
			{children}
		</motion.div>
	);
}

export default AnimatedRoutes;
