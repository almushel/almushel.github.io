const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(`
	input[type=checkbox] {
		filter: grayscale(100%) invert(100%) brightness(150%);
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

	@keyframes glow-pulse {
		from {
			filter: drop-shadow(0 0 0 var(--accent-color))
		}

		to {
			filter: drop-shadow(0 0 8px var(--accent-color));
		}
	}

	.glowing {
		animation: 4s ease-in infinite alternate glow-pulse;
	}

	#playlist-container {
		user-select: none;
		background: var(--bg-color-1);
		border: 1px solid var(--bg-color-3);
	}

	#playlist-header {
		padding: .5em;
		border-bottom: 1px solid var(--bg-color-3);
		overflow: hidden;
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
		margin-right: .25em;

		transform: translate(25%, 25%);
		
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

	#repeat-checkbox {
		display:none;
	}

	label[for="repeat-checkbox"] {
		cursor: pointer;
		border-left: 1px solid var(--bg-color-2);
	}

	label[for="repeat-checkbox"]:hover {
		filter: brightness(110%);
	}

	label[for="repeat-checkbox"]::before {
		line-height: 1.25em;
		font-size: 1.5em;

		filter: grayscale(75%);

		content: "🔁";
	}

	#repeat-checkbox:checked + label[for="repeat-checkbox"]::before {
		content: "🔂";
	}

	#repeat-checkbox:active + label[for="repeat-checkbox"] {
		filter: brightness(75%);
	}

/* Transport Time Clock */	
	
	label[for="seek-slider"] {
		font-family: monospace;
		line-height: 1.5em;
		padding: .5em;
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

		position: relative;
		top: 0.25em;
		text-align: center;
		margin: auto;

		width: 100%;
		height: 100%;

		background: inherit;

		filter: grayscale(100%);
	}

	#volume-slider {
		display: none;

		position: relative;
		left: 0.5px;
		top: calc(-4em + 2px);
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

	#playlist-footer {
		padding: .25em;
		background: var(--bg-color-2);
	}

	#playlist-footer-title, #now-playing {
		cursor: default;

		position: relative;
		letter-spacing: .15em;
	}

	#playlist-footer > :is(input, label) {
		vertical-align: middle;
		float: right;
	}

`)

const template = document.createElement("template");
template.innerHTML = `
<div id="playlist-container">
	<div id="player-controls">
		<button id="play-button" title="Play/Pause"></button>
		<input type="checkbox" id="repeat-checkbox"><label for="repeat-checkbox" title="Repeat"></label>
		<label for="seek-slider" title="Time Clock">0:00 / 0:00</label><input type="range" id="seek-slider" value="0" step="0.001" title="Playback Position">
		<div id="volume-controls" title="Volume">
			<input type="checkbox" id="volume-toggle"><label for="volume-toggle"></label>
			<input type="range" id="volume-slider" value="1" min="0" max="1" step="0.01">
		</div>
	</div>
	<audio id="player-audio"></audio>
	<div id="playlist"></div>
	<div id="playlist-footer">
		<span id="playlist-footer-title"></span>
		<input type="checkbox" id="playlist-autoplay-checkbox"><label for="playlist-autoplay-checkbox" title="Autoplay">Autoplay</label>
	</div>
</div>
`

class AudioPlaylist extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: "closed"});
		shadowRoot.adoptedStyleSheets = [stylesheet];
		shadowRoot.appendChild(template.content.cloneNode(true));

		this.footer = shadowRoot.querySelector("#playlist-footer");

		this.controls = {
			play_button: shadowRoot.querySelector("#play-button"),
			time_clock: shadowRoot.querySelector(`label[for="seek-slider"]`),
			seek_slider: shadowRoot.querySelector("#seek-slider"),
			volume_label: shadowRoot.querySelector("label[for=volume-toggle]"),
			volume_slider: shadowRoot.querySelector("#volume-slider"),
			playlist: shadowRoot.querySelector("#playlist"),
			list_elements: [],
		}

		const timeupdate_callback = () => {
			if (this.active_track.duration) this.updateSeekSlider();
		}
		
		this.sources = [];

		this.active_track_index = null;
		this.active_track = shadowRoot.querySelector("#player-audio");
		this.active_track.onloadeddata = () => {
			this.controls.seek_slider.max = this.active_track.duration;
			this.updateTimeClock(0, this.active_track.duration);
		}
		this.active_track.onplay = () => {
			this.controls.play_button.classList.add("paused"); 
		}
		this.active_track.onpause = () => {
			this.controls.play_button.classList.remove("paused"); 
		}
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

		shadowRoot.querySelector("#repeat-checkbox").onchange = (e) => {
			this.active_track.loop = e.target.checked;
		}

		let autoplay_checkbox = shadowRoot.querySelector("#playlist-autoplay-checkbox");
		autoplay_checkbox.onchange = (e) => {
			if (e.target.checked) {
				this.active_track.onended = () => {
					let next_track_index = this.active_track_index + 1;
					
					if (next_track_index < this.controls.list_elements.length) {
						this.controls.list_elements[next_track_index].click();
					}
				}
			} else {
				this.active_track.onended = null;
			}
		}
		if (this.hasAttribute("autoplay")) autoplay_checkbox.click();

		shadowRoot.querySelector("#playlist-footer-title").innerText = this.dataset.title;
	}

	connectedCallback() {
		if (this.isConnected && this.sources) {
			let first_item = true;
			for (let source of Array.from(this.children)) {
				if (source.tagName != "SOURCE") continue;
				let title = source?.getAttribute("title") || source?.getAttribute("src");
				// TO-DO: Check for duplicate title/src

				let id = title.replace(" ", "-") + "-radio";
				
				let track_index = this.sources.push(source) - 1;

				this.controls.playlist.insertAdjacentHTML("beforeend", `
					<input type="radio" id="${id}" name="playlist-radio-selection" ${first_item ? "checked" : ""}><label for="${id}">${title}</label>
				`);

				this.controls.list_elements[track_index] = this.controls.playlist.querySelector(`#${id}`);
				this.controls.list_elements[track_index]
					.onchange = (e) => {
						if (e.target.checked)  {
							this.setActiveTrack(track_index);
							this.active_track.play();
						}
					}

				if (first_item) this.setActiveTrack(track_index);
				first_item = false;
			}
		}
	}

	setActiveTrack(index) {
		if (this.active_track_index === index) return;

		this.active_track_index = index;
		let source = this.sources[index];
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