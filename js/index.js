import TagFilter from "./tag-filter.js"
import TileContainer from "./tile-container.js"

customElements.define("tag-filter", TagFilter);
customElements.define("tile-container", TileContainer);

const topLevel = (window.location.href == window.location.origin+"/");
const homeLink = topLevel ? "#top" : "/";
const sectionPrefix = topLevel ? "" : "/";
const topMenuContent = `
	<span class="nav-label">Menu</span>
	<input type="radio" id="menu-toggle-off" name="menu" checked>
	<input type="radio" id="menu-toggle-on" name="menu">
	
	<div class="nav-menu">
		<a href="${homeLink}">Home</a>
		<a href="${sectionPrefix}#about">About</a>
		<a href="${sectionPrefix}#games">Games</a>
		<a href="${sectionPrefix}#music">Music</a>
		<a href="${sectionPrefix}#audio">Audio</a>
		<a href="/articles"> Articles</a>
	</div>
`
document.getElementById("tagline").innerHTML = "High performance ludic software";
document.getElementById("top-nav").innerHTML = topMenuContent;
