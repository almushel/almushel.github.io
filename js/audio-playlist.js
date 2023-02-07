const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
	
	audio {
		margin: .5em;
		width: calc(100% - 1em);
	}

	.playlist-container {
		background: var(--bg-color-1);
		border: 1px solid var(--bg-color-3);
	}

	.playlist {
		border: 1px solid var(--bg-color-3);
	}

	.playlist input[type="radio"] {
		display: none;
	}

	.playlist label {
		cursor: pointer;
		display: block;
		padding: .25em;
		border-bottom: 1px solid var(--bg-color-3);
	}

	.playlist label:hover {
		background: var(--bg-color-3);
	}

	.playlist input[type="radio"]:checked+label {
		color: var(--accent-color);
		border-bottom: 1px solid var(--accent-color);
	}
`)

const template = document.createElement("template");
template.innerHTML = `
<div class="playlist-container">
	<div class="playlist"></div>
	<slot name="sources"></slot>
</div>
`

class AudioPlaylist extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: "open"});
		this.shadowRoot.adoptedStyleSheets = [stylesheet];
		this.shadowRoot.appendChild(template.content.cloneNode(true));

		this.playlist = this.shadowRoot.querySelector(".playlist");
		this.sources = this.shadowRoot.querySelector(`slot[name="sources"]`).assignedNodes()[0];
		this.active_track = null;
	}

	connectedCallback() {
		if (this.isConnected && this.sources) {
			let untitled_count = 0;
			let first_item = true;
			for (let audio of Array.from(this.sources.children)) {
				let title = audio?.getAttribute("title") || audio?.getAttribute("src");
				if (!title) title = "Untitled" + ++untitled_count;

				let id = title.replace(" ", "-") + "-radio";
				
				this.playlist.insertAdjacentHTML("beforeend", `
					<input type="radio" id="${id}" name="playlist-radio-selection" ${first_item ? "checked" : ""}><label for="${id}">${title}</label>
				`);

				this.shadowRoot.querySelector(`#${id}`).onchange = (e) => {
					if (e.target.checked)  {
						this.setActiveTrack(title);
						this.active_track.play();
					}
				}

				first_item = false;
			}

			this.setActiveTrack(this.querySelector("audio").title);
		}
	}

	setActiveTrack(title) {
		if (this?.active_track?.title === title) return;

		let source = this.sources.querySelector(`[title="${title}"]`);
		if (source) {
			if (this.active_track) {
				this.active_track.pause();
				this.active_track.currentTime = 0;
				this.active_track.controls = false; //remove controls from previous track
				this.sources.append(this.active_track);
			}

			this.active_track = source;
			this.active_track.controls = true;
			this.playlist.insertAdjacentElement("beforebegin", this.active_track);
		}
	}
}

customElements.define("audio-playlist", AudioPlaylist);