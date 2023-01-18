import TileContainer from "./tile-container.js"

customElements.define("tile-container", TileContainer);

window.onload = () => {
	let tag = document.getElementById("tagline");
	fetch("./files/tagline.txt")
		.then(response => response.text())
		.then(data => tag.innerHTML = data)
}