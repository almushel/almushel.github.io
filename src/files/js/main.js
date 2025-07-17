const components = ["tile-container", "tag-filter", "audio-playlist", "key-animation"];
for (let component of components) {
	if (document.querySelector(component)) {
		import(`./components/${component}.js`)
	}
}

const origin = window.location.origin+"/";
const currentPage = window.location.href;

const copywriteText = `© Andrew Mushel ${new Date().getFullYear()}`;
const footer = document.querySelector("body footer #copyright");
if (footer.innerText != copywriteText) {
	footer.innerText = copywriteText;
}
