/* TileContainer attributes
// "href" : Link target. Wraps tile content in an anchor tag
// "img" : Foreground image shown by default, hidden on hover if video or img2 are defined
// "video" : Background video hidden by default, shown on hover
// "img2" : Background image hidden by default, alternative to video attribute. Ignored if video is defined.
// "iframe" : Embedded iframe. Overrides all foreground and background images/videos
// "cols" : Width of tile in columns (currently 3 columns per page width).
// "title" : Subtitle shown on hover. Also populates related attributes of other elements (e.g. "alt")
*/

export class TileContainer extends HTMLElement {
	constructor() {
		super();
		this.initialized = false;
		let shadowRoot = this.attachShadow({mode: "closed"});

		let styles = document.createElement("link");
		styles.setAttribute("rel", "stylesheet");
		styles.setAttribute("href", "/assets/css/tile-container.css");

		let container = document.createElement("div");
		container.classList.add("tile-container", "smooth-expand");
		container.dataset.columns = this.dataset.columns;
		container.dataset.rows = this.dataset.rows;

		this._content = document.createElement("div");
		this._content.classList.add("tile-content");
		
		if (this.hasAttribute("href")) {
			let anchor = container.appendChild(document.createElement("a"));
			anchor.href = this.getAttribute("href");
			anchor.appendChild(this._content);
		} else {
			container.appendChild(this._content);
		}

		shadowRoot.append(styles, container);
	}

	connectedCallback() {
		if (this.isConnected & !this.initialized) {
			const title = this.getAttribute("title") || "";
			// The content is loaded after connection so that container layout is established before rendering
			if (this.hasAttribute("iframe")) {
				let frame = this._content.appendChild(document.createElement("iframe"));
				frame.src = this.getAttribute("iframe");
				frame.allowfullscreen = "allowfullscreen";
				frame.loading = "lazy";
				frame.width = "99.6%";
				frame.height = "99.6%";
			} else {
				if (this.hasAttribute("video")) { // Background video
					let video = this._content.appendChild(document.createElement("video"));
					video.autoplay = true;
					video.loop = true;
					video.muted = true;
					video.width = video.height = "99.6%";
					video.title = title;
					video.classList.add("show-on-hover");
					video.src = this.getAttribute("video");
				} else if (this.hasAttribute("img2")) { // Background image
					let image = this._content.appendChild(document.createElement("img"));
					image.loading = "lazy";
					image.src = this.getAttribute("img2");
					image.classList.add("show-on-hover");
				}
	
				if (this.hasAttribute("img")) { // Foreground image
					let image = this._content.appendChild(document.createElement("img"));
					image.src = this.getAttribute("img");
					image.alt = title;
					if (this.hasAttribute("img2") || this.hasAttribute("video")) image.classList.add("hide-on-hover");
				}
			}

			this.initialized = true;
		}
	}
}

customElements.define("tile-container", TileContainer);
