let template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="/css/tile-container.css">
<style>
	.tile-content ::slotted(img) {
		width: 100%;
		position: absolute;
		align-self: center;
		top: 50%;
		transform: translate(0, -50%);
	}

	.tile-content ::slotted(video) {
		width: 100%;
		height: 100%;
		position: absolute;
		background: black;
	}

	.tile-content ::slotted(iframe) {
		width: 99%;
		height: 99%;
	}

	::slotted(*[slot="show-layer"]) {
		opacity: 0.0;
		transition: opacity 0.5s ease-in;
	}
	
	*:hover ::slotted(*[slot="show-layer"]) {
		opacity: 1.0;
	}

	::slotted(*[slot="hide-layer"]) {
		opacity: 1.0;
		transition: opacity 0.5s ease-in;
	}

	*:hover ::slotted(*[slot="hide-layer"]) {
		opacity: 0.0;
	}

</style>
<div class="tile-container one-column smooth-expand">
	<div class="tile-content">
		<a>
			<slot name="static-layer"></slot>
			<slot name="show-layer"></slot>
			<slot name="hide-layer"></slot>
			<div class="subtitle show-on-hover"></div>
		</a>
	</div>
</div>
`

export default class TileContainer extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: "closed"});
		shadowRoot.append(template.content.cloneNode(true));

		if (this.hasAttribute("href")) shadowRoot.querySelector("a").href = this.getAttribute("href");

		let title = this?.getAttribute("title") || "";
		shadowRoot.querySelector(".subtitle").innerHTML = title || "";

		for (let slot of shadowRoot.querySelectorAll("slot")) {
			for (let node of slot.assignedNodes()) {
				node.title = title || node.src.slice( (node.src.lastIndexOf("/") + 1) || (node.src.length-1));
				switch(node.tagName) {
					case "VIDEO": {
						node.autoplay = true;
						node.loop = true;
						node.muted = true;
					} break;
					case "IMG": {
						node.loading = "lazy";
						node.alt = node.title;
					} break;
					case "IFRAME": {
						node.allowfullscreen = "allowfullscreen";
						node.loading = "lazy";
					} break;
				}
			}		
		}
	}
}