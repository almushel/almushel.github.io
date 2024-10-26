const doorTextures = ["/images/door_red.png", "/images/door_blue.png", "/images/door_green.png", "/images/door.png"];

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


document.adoptedStyleSheets = [...document.adoptedStyleSheets, gbPageStyles];

window.addEventListener("scroll", () => {
	document.documentElement.style.setProperty("--scroll", window.pageYOffset / (document.documentElement.offsetHeight - window.innerHeight));
}, false);
