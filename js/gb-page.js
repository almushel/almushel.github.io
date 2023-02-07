const doorTextures = ["/images/door_red.png", "/images/door_blue.png", "/images/door_green.png", "/images/door.png"];
const keyStyles = new CSSStyleSheet();
keyStyles.replaceSync(`
	.animKey {
		margin-left: 37.5%;
		height: 25%;
		width: auto;
		position: absolute;
		animation: verticalBob 1s ease-in-out infinite alternate;

		animation-delay: calc(var(--scroll) * 1.5s);
	}
	
	.keyTainer {
		float: left;
		position: relative;
		height: 0;
		padding-top: 25%;
		width: 25%;
	}
	
	.key-shadow {
		position: absolute;
		background-color: black;
		margin-top: -15%;
		margin-left: 37.5%;
		width: 25%;
		height: 8%;
		border-radius: 100%;
	}

	@keyframes verticalBob {
		from {
			top: 15%
		}

		to {
			top: 55%
		}
	}

	.pixelated {
		image-rendering: pixelated;
	}
	
`);

const gbPageStyles = new CSSStyleSheet();
gbPageStyles.replaceSync(`
	html {
		background: fixed no-repeat center/cover url("/images/gb-behind-door.png");
		image-rendering: pixelated;
	}

	.scrolling-door-bg {
		z-index: -1;
		position: fixed;
		left: calc( var(--scroll) * -100% );


		width: 100%;
		height: 100%;

		background: local no-repeat right/100% auto url("${doorTextures[Math.floor(Math.random() * doorTextures.length)]}");
		border-bottom: 1px solid var(--bg-color-1);
	}

	.content {
		filter: drop-shadow(0 1px 4px var(--accent-color));
	}
`);

class KeyAnimation extends HTMLElement {
	constructor() {
		super();

		const shadow = this.attachShadow({mode: "closed"});
		shadow.adoptedStyleSheets = [keyStyles];
		
		shadow.innerHTML = `
			<div class='keyTainer'>
				<img src="${this.getAttribute("src") || ""}" alt="${this.getAttribute("alt") || ""}" class="animKey pixelated">
				<div class='key-shadow'></div>
			</div>
		`;
	}
}
customElements.define("key-animation", KeyAnimation);

document.adoptedStyleSheets = [...document.adoptedStyleSheets, gbPageStyles];

window.addEventListener("scroll", () => {
	document.documentElement.style.setProperty("--scroll", window.pageYOffset / (document.documentElement.offsetHeight - window.innerHeight));
}, false);