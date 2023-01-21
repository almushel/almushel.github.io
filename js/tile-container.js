/*	TileContainer attributes
// "href" : Link target. Wraps tile content in an anchor tag
//	"img" : Foreground image shown by default, hidden on hover if video or img2 are defined
// "video" : Background video hidden by default, shown on hover
// "img2" : Background image hidden by default, alternative to video attribute. Ignored if video is defined.
// "iframe" : Embedded iframe. Overrides all foreground and background images/videos
// "cols" : Width of tile in columns (currently 3 columns per page width).
// "title" : Subtitle shown on hover. Also populates related attributes of other elements (e.g. "alt")
*/

export default class TileContainer extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		if (this.isConnected) {
			let shadowRoot = this.attachShadow({mode: "open"});

			let styles = document.createElement("link");
			styles.setAttribute("rel", "stylesheet");
			styles.setAttribute("href", "/css/tile-container.css");

			let container = document.createElement("div");
			container.classList.add("tile-container", "smooth-expand");
			container.dataset.columns = this.dataset.columns;

			let tileContent = document.createElement("div");
			tileContent.classList.add("tile-content");
			
			if (this.hasAttribute("href")) {
				let anchor = container.appendChild(document.createElement("a"));
				anchor.href = this.getAttribute("href");
				anchor.appendChild(tileContent);
			} else {
				container.appendChild(tileContent);
			}

			if(this.hasAttribute("iframe")) {
				let frame = tileContent.appendChild(document.createElement("iframe"));
				frame.src = this.getAttribute("iframe");
				frame.allowfullscreen = "allowfullscreen";
				frame.loading = "lazy";
				frame.width = "99.6%";
				frame.height = "99.6%";
			} else {
				// TO-DO: Pause when hidden, resume on hover
				if (this.hasAttribute("video")) { // Background video
					let video = tileContent.appendChild(document.createElement("video"));
					video.autoplay = true;
					video.loop = true;
					video.muted = true;
					video.title = this.getAttribute("title");
					video.classList.add("show-on-hover");
					video.src = this.getAttribute("video");
				} else if (this.hasAttribute("img2")) { // Background image
					let image = tileContent.appendChild(document.createElement("img"));
					image.loading = "lazy";
					image.src = this.getAttribute("img2");
					image.classList.add("show-on-hover");
				}

				if (this.hasAttribute("img")) { // Foreground image
					let image = tileContent.appendChild(document.createElement("img"));
					image.src = this.getAttribute("img");
					image.alt = this?.getAttribute("title");
					if (this.hasAttribute("img2") || this.hasAttribute("video")) image.classList.add("hide-on-hover");
				}
			}


			if (this.hasAttribute("title")) {
				let title = tileContent.appendChild(document.createElement("div"));
				title.innerText = this.getAttribute("title");
				title.classList.add("show-on-hover", "subtitle");
			}

			shadowRoot.append(styles, container);
		}
	}
}