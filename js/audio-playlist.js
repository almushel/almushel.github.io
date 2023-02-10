const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
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

	#playlist-container {
		background: var(--bg-color-1);
		border: 1px solid var(--bg-color-3);
	}

	#player-controls {
		display: flex;
		border-bottom: 1px solid var(--bg-color-3);
	}

/* Play Button */

	#play-button {
		cursor: pointer;

		width: 1.5em;
		height: 1.5em;
		margin: .55em -.1em 0 .75em;
		
		box-sizing: border-box;
		border-width: .75em 0 .75em 1.5em;
		border-style: solid;

		background: transparent;
		border-color: transparent transparent transparent var(--bg-color-3);
		filter: brightness(150%);
	}

	#play-button:hover {
		filter: brightness(250%);
	}

	#play-button:active {
		filter: brightness(200%);
	}

	#play-button.paused { 
		border-width: 0 0 0 1.5em;
		border-style: double;
	}

/* Loop Button */

	#loop-checkbox {
		display:none;
	}

	label[for="loop-checkbox"] {
		border-left: 1px solid var(--bg-color-2);
	}

	label[for="loop-checkbox"]:hover {
		filter: brightness(110%);
	}

	label[for="loop-checkbox"]::before {
		font-size: 1.5em;

		filter: grayscale(75%);

		content: "🔁";
	}

	#loop-checkbox:checked + label[for="loop-checkbox"]::before {
		content: "🔂";
	}

	#loop-checkbox:active + label[for="loop-checkbox"] {
		filter: brightness(75%);
	}

/* Transport Time Clock */	
	
	label[for="seek-slider"] {
		font-family: monospace;
		padding: .75em;
		border-left: 1px solid var(--bg-color-2);
		border-right: 1px solid var(--bg-color-2);
	}

/* Volume Controls */

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

		background: inherit;

		filter: grayscale(100%);
	}

	#volume-slider {
		display: none;

		position: relative;
		left: 0;
		top: calc(-4em - 2px);
		transform-origin: 0% 50%;
		transform: rotate(-90deg) translateY(40%);
		height: inherit;
	
		background: var(--bg-color-1);
		border: 1px solid var(--bg-color-2);
	}

	#volume-toggle:checked ~ #volume-slider {
		display: unset;
	}

/* Playlist Controls */

	#playlist {
		margin-bottom: .25em;
		border: 1px solid var(--bg-color-3);
	}

	#playlist input[type="radio"] {
		display: none;
	}

	#playlist label {
		cursor: pointer;
		display: block;
		padding: .25em .5em;
		border-bottom: 1px solid var(--bg-color-3);
	}

	#playlist label:hover {
		background: var(--bg-color-3);
	}

	#playlist input[type="radio"]:checked+label {
		color: var(--accent-color);
		border-bottom: 1px solid var(--accent-color);
	}
`)

const template = document.createElement("template");
template.innerHTML = `
<div id="playlist-container">
	<div id="player-controls">
		<button id="play-button"></button>
		<input type="checkbox" id="loop-checkbox"><label for="loop-checkbox" title="Loop"></label>
		<label for="seek-slider">0:00 / 0:00</label><input type="range" id="seek-slider" value="0" step="0.001">
		<div id="volume-controls" title="Volume Controls">
			<input type="checkbox" id="volume-toggle"><label for="volume-toggle"></label>
			<input type="range" id="volume-slider" value="1" min="0" max="1" step="0.01">
		</div>
	</div>
	
	<audio id="player-audio"></audio>
	<div id="playlist"></div>
</div>
`

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
			playlist: shadowRoot.querySelector("#playlist"),
		}

		const timeupdate_callback = () => {
			if (this.active_track.duration) this.updateSeekSlider();
		}
		
		this.sources = {};
		this.index = [];

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

		this.controls.volume_label.innerHTML = "&#128266;";
		this.controls.volume_slider.oninput = (e) => { 
			this.active_track.volume = e.target.value;
			
			this.controls.volume_label.innerHTML = 
				e.target.value > 0.5 ? 	"&#128266;"	:
				e.target.value > 0   ? 	"&#128265;" :
										"&#128264;" ;
		}

		shadowRoot.querySelector("#loop-checkbox").onchange = (e) => {
			this.active_track.loop = e.target.checked;
		}
	}

	connectedCallback() {
		if (this.isConnected && this.sources) {
			let untitled_count = 0;
			let first_item = true;
			for (let audio of Array.from(this.children)) {
				if (audio.tagName != "SOURCE") continue;
				let title = audio?.getAttribute("title") || audio?.getAttribute("src");
				if (!title) title = "Untitled" + ++untitled_count;

				let id = title.replace(" ", "-") + "-radio";
				
				this.sources[title] = audio;
				this.index.push(title);

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

		let source = this.sources[title];
		if (source) {
			if (this.active_track) {
				this.active_track.pause();
				this.active_track.currentTime = 0;
			}

			this.controls.seek_slider.value = 0;
			this.active_track.src = source.src;
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