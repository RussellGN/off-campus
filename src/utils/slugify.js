export default function slugfify(string, id) {
	const words = string.split(" ");
	let slug = "";
	words.forEach((word) => {
		slug += word.trim().toLowerCase() + "-";
	});
	slug += id;
	return slug;
}
