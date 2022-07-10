import {parsePageDefinition} from "./render.js";
import {banner, sideNav, social, portfolio} from "./pages.js";

window.onload = () => {
	let container = document.getElementById("vanilla-router");

	if (container) {
		container.appendChild(
			parsePageDefinition(
				banner.concat(sideNav, portfolio, social)
			)
		);

	}
}