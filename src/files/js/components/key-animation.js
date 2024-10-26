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
