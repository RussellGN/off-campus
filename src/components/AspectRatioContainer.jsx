import { useState, useRef, useEffect } from "react";

function AspectRatioContainer({ children, ratio = 0.5625 }) {
	const [height, setHeight] = useState("fit-content");
	const itemRef = useRef();

	useEffect(() => {
		function handleResize() {
			const width = itemRef.current.clientWidth;
			setHeight(width * ratio);
		}
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, [ratio]);

	return (
		<div ref={itemRef} style={{ width: "100%", height: height }}>
			{children}
		</div>
	);
}

export default AspectRatioContainer;
