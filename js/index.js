import TagFilter from "./tag-filter.js"
import TileContainer from "./tile-container.js"

customElements.define("tag-filter", TagFilter);
customElements.define("tile-container", TileContainer);

const origin = window.location.origin+"/";
const currentPage = window.location.href;

const topMenuContent = `
	<input type="checkbox" id="menu-toggle" name="menu"><label for="menu-toggle">Menu <span class="arrow"></span></label>
	
	<div class="nav-menu">
		<a href="${currentPage == origin ? "#top" : "/"}">Home</a>
		<a href="/#about">About</a>
		<a href="/#games">Games</a>
		<a href="/#music">Music</a>
		<a href="/#audio">Audio</a>
		<${currentPage != origin+"articles/" ? "a href=\"/articles\"" : "div"}>Articles</ ${currentPage != origin+"articles/" ? "a" : "div"}>
	</div>
`;
document.getElementById("tagline").innerHTML = "High performance ludic software";
document.getElementById("top-nav").innerHTML = topMenuContent;