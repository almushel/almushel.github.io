import {renderPage} from "./render.js";
import {homePage} from "./pages.js";

window.onload = () => {
	let root = document.getElementById("vanilla-router");

	if (root) {
		root.appendChild(
			renderPage(
				homePage
			)
		);

	}
}