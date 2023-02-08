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

	#transport-controls {
		display: flex;
		border-bottom: 1px solid var(--bg-color-3);
	}

	#play-button {
		cursor: pointer;

		width: 1.5em;
		height: 1.5em;
		margin: .5em 0 0 .75em;
		
		box-sizing: border-box;
		border-width: .75em 0 .75em 1.5em;
		border-style: solid;

		background: transparent;
		border-color: transparent transparent transparent var(--bg-color-3);
		filter: brightness(150%);
	}

	#play-button.paused { 
		border-width: 0 0 0 1.5em;
		border-style: double;
	}

	#play-button:hover {
		filter: brightness(250%);
	}

	#transport-controls label[for="seek-slider"] {
		font-family: monospace;
		padding: .75em;
		border-left: 1px solid var(--bg-color-2);
		border-right: 1px solid var(--bg-color-2);
	}

	input[type="range"] {
		flex: auto;
		-webkit-appearance: none;
		background: transparent;
	}

	input[type="range"]::-webkit-slider-runnable-track {
		-webkit-appearance: none;
		height: .25em;
		border: 2px solid var(--bg-color-3);
		margin: .5em;
	}

	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none;
		background: var(--accent-color);
		width: 1em;
		height: 1em;
		border-radius: 50%;
		transform: translateY(-.5em);
	}

	#volume-controls {
		border-left: 1px solid var(--bg-color-2);
		width: 2em;
		height: 2em;
	}

	#volume-toggle {
		display: none;
	}

	label[for="volume-toggle"] {
		cursor: pointer;
		display: block;

		vertical-align: middle;
		text-align: center;
		margin: auto;

		width: 100%;
		height: 100%;
		padding-top: .25em;

		filter: grayscale(100%);
	}

	#volume-slider {
		position: relative;
		left: 0;
		top: -3.5em;
		transform-origin: 0% 50%;
		transform: rotate(-90deg) translateY(75%);
	
		background: var(--bg-color-1);
		border: 1px solid var(--bg-color-2);

		z-index: -1;
	}

	#volume-toggle:checked ~ #volume-slider {
		z-index: 1;
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
		padding: .25em .5em;
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
	<div id="transport-controls">
		<button id="play-button"></button>
		<label for="seek-slider">0:00 / 0:00</label><input type="range" id="seek-slider" value="0" step="0.1">
		<div id="volume-controls" title="Volume Controls">
			<input type="checkbox" id="volume-toggle"><label for="volume-toggle">&#128266</label>
			<input type="range" id="volume-slider" value="1" min="0" max="1" step="0.01">
		</div>
	</div>
	
	<audio id="player-audio"></audio>
	<div class="playlist"></div>
	<slot name="sources"></slot>
</div>
`

const volume_emojis = [
	{min: 0.5, code: 128266},
	{min: 0, code: 128265},
	{min: -Infinity, code: 128264}
];

class AudioPlaylist extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: "closed"});
		shadowRoot.adoptedStyleSheets = [stylesheet];
		shadowRoot.appendChild(template.content.cloneNode(true));

		this.controls = {
			play_button: shadowRoot.querySelector("#play-button"),
			time_clock: shadowRoot.querySelector(`label[for="seek-slider"]`),
			seek_slider: shadowRoot.querySelector("#seek-slider"),
			volume_label: shadowRoot.querySelector("label[for=volume-toggle]"),
			volume_slider: shadowRoot.querySelector("#volume-slider"),
			playlist: shadowRoot.querySelector(".playlist"),
		}

		const timeupdate_callback = () => {
			if (this.active_track.duration) this.updateSeekSlider();
		}
		
		// NOTE: Is it possible to have more than one node assigned to the same slot?
		this.sources = shadowRoot.querySelector(`slot[name="sources"]`).assignedNodes()[0],

		this.active_track = shadowRoot.querySelector("#player-audio");
		this.active_track.onloadeddata = () => {
			this.controls.seek_slider.max = this.active_track.duration;
			this.updateTimeClock(0, this.active_track.duration);
		}
		this.active_track.onplay = () => {this.controls.play_button.classList.add("paused"); }
		this.active_track.onpause = () => {this.controls.play_button.classList.remove("paused"); }
		this.active_track.ontimeupdate = timeupdate_callback;

		this.controls.play_button.onclick = () => {
			if (this.active_track.paused) this.active_track.play();
			else this.active_track.pause();
		}

		const seek_slider = this.controls.seek_slider;
		seek_slider.min = 0;
		seek_slider.onmousedown = () => {this.active_track.ontimeupdate = null; }
		seek_slider.onchange = (e) => {
			this.active_track.currentTime = e.target.value;
			this.active_track.ontimeupdate = timeupdate_callback;
		}
		seek_slider.oninput = () => { this.updateTimeClock(seek_slider.value, this.active_track.duration);}

		this.controls.volume_slider.oninput = (e) => { 
			this.active_track.volume = e.target.value;
		
			for (let icon of volume_emojis) {
				if (e.target.value > icon.min) { 
					this.controls.volume_label.innerHTML = `&#${icon.code}`;
					break;
				}
			}
		}
	}

	connectedCallback() {
		if (this.isConnected && this.sources) {
			let untitled_count = 0;
			let first_item = true;
			for (let audio of Array.from(this.sources.children)) {
				if (audio.tagName != "SOURCE") continue;
				let title = audio?.getAttribute("title") || audio?.getAttribute("src");
				if (!title) title = "Untitled" + ++untitled_count;

				let id = title.replace(" ", "-") + "-radio";
				
				this.controls.playlist.insertAdjacentHTML("beforeend", `
					<input type="radio" id="${id}" name="playlist-radio-selection" ${first_item ? "checked" : ""}><label for="${id}">${title}</label>
				`);

				this.controls.playlist.querySelector(`#${id}`).onchange = (e) => {
					if (e.target.checked)  {
						this.setActiveTrack(title);
						this.active_track.play();
					}
				}

				if (first_item) this.setActiveTrack(audio.title);
				first_item = false;
			}
		}
	}

	setActiveTrack(title) {
		if (this?.active_track?.title === title) return;

		let source = this.sources.querySelector(`source[title="${title}"]`);
		if (source) {
			if (this.active_track) {
				this.active_track.pause();
				this.active_track.currentTime = 0;
				this.sources.append(this.active_track.querySelector("source") || "");
			}

			this.controls.seek_slider.value = 0;
			this.active_track.append(source);
			this.active_track.load();
		}
	}

	updateSeekSlider() {
		const slider = this.controls.seek_slider;
		let new_value = this.active_track.currentTime;
		
		if (new_value != slider.value) {
			slider.value = new_value;
			this.updateTimeClock(new_value, this.active_track.duration);
		}
	}

	updateTimeClock(current_seconds, duration_seconds) {
		this.controls.time_clock.innerText = 
			`${seconds_to_time_clock(current_seconds)} / ${seconds_to_time_clock(duration_seconds)}`;
	}
}

function seconds_to_time_clock(time_in_seconds) {
	let minutes = Math.floor(time_in_seconds / 60); 
	let seconds = Math.floor(time_in_seconds % 60);

	if (seconds < 10) seconds = "0"+seconds;

	return `${minutes}:${seconds}`;
}

customElements.define("audio-playlist", AudioPlaylist);