const definition = {
	title: "",
	href: "",
	imgSrc: "",
	img2Src: "",
	videoSrc: "",
	iframeSrc: "",
	columns: 1,
} 

window.onload = () => {main();}

function main() {
	let tag = document.getElementById("tagline");
	fetch("./files/tagline.txt")
		.then(response => response.text())
		.then(data => tag.innerHTML = data)

	createSoloProjectTiles();
	createContributionTiles();
	createMusicTiles();
	createAudioTiles();
}

function createSoloProjectTiles() {
	let soloProjects = document.getElementById("solo-projects");
	let tileList = [];

	tileList.push(
		createTileElement({
			title: "Loot Not Found",
			href: "https://js13kgames.com/entries/loot-not-found",
			videoSrc: "/videos/loot-not-found.mp4",
			imgSrc: "/images/loot-not-found.png"
		})
	);

	tileList.push(
		createTileElement({
			title: "Space Drifter",
			href: "https://almushel.itch.io/space-drifter",
			videoSrc: "/videos/space-drifter.mp4",
			imgSrc: "/images/space-drifter.png"
		})
	);

	tileList.push(
		createTileElement({
			title: "JS Raycaster",
			href: "/portfolio/js-raycaster.html",
			videoSrc: "/videos/js-raycaster.mp4",
			imgSrc: "/images/js-raycaster.png"
		})
	);

	for (let tile of tileList){
		soloProjects.appendChild(tile);
	}
}

function createContributionTiles() {
	let teamProjects = document.getElementById("team-projects");
	let tileList = [];

	tileList.push(
		createTileElement({
			title: "Glacierbound",
			href: "/portfolio/glacierbound.html",
			imgSrc: "/images/glacierbound.png",
			img2Src: "/images/glacierbound-gameplay.gif",
		})
	);

	tileList.push(
		createTileElement({
			title: "Video Nok",
			href: "/portfolio/video-nok.html",
			imgSrc: "/images/video-nok.png",
			img2Src: "/images/video-nok-gameplay.gif",
		})
	);

	tileList.push(
		createTileElement({
			title: "Ghost Rustlers",
			href: "/portfolio/ghostrustlers.html",
			imgSrc: "/images/ghost-rustlers.png",
			img2Src: "/images/ghost-rustlers-gameplay.gif",
		})
	);

	tileList.push(
		createTileElement({
			title: "Falldale",
			href: "/portfolio/falldale.html",
			imgSrc: "/images/falldale.png",
			img2Src: "/images/falldale-ee-gameplay.gif",
		})
	);

	tileList.push(
		createTileElement({
			title: "G-Type",
			href: "/portfolio/g-type.html",
			imgSrc: "/images/g-type.png",
			img2Src: "/images/g-type-gameplay.gif",
		})
	);

	tileList.push(
		createTileElement({
			title: "Hard Glitch",
			href: "https://klaim.itch.io/hardglitch",
			imgSrc: "/images/hardglitch.png",
			img2Src: "/images/hardglitch-gameplay.gif",
		})
	);

	tileList.push(
		createTileElement({
			title: "CryptoClash",
			href: "https://globalgamejam.org/2018/games/cryptoclash",
			imgSrc: "/images/CryptoClash.jpg",
		})
	);

	tileList.push(
		createTileElement({
			title: "Flipside",
			href: "https://gamkedo.itch.io/flipside",
			imgSrc: "/images/flipside.png",
		})
	);

	tileList.push(
		createTileElement({
			title: "A Slime's Quest for Freedom",
			href: "https://hrgames.itch.io/a-slimes-quest-for-freedom",
			imgSrc: "/images/ASQFF.jpg",
		})
	);

	for (let tile of tileList){
		teamProjects.appendChild(tile);
	}
}

function createMusicTiles() {
	let musicReleases = document.getElementById("music-releases");
	let tileList = [];

	tileList.push(
		createTileElement({
			title: "Space Drifter Original Soundtrack",
			iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=592038833/size=large/bgcol=333333/linkcol=0687f5/minimal=true/transparent=true/"
		})
	);
	
	tileList.push(
		createTileElement({
			title: "Zero Project",
			iframeSrc: "https://bandcamp.com/EmbeddedPlayer/size=large/bgcol=333333/linkcol=ffffff/minimal=true/track=3837871122/transparent=true/"
		})
	);
	
	tileList.push(
		createTileElement({
			title: "Invasion",
			iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=2796591934/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/"
		})
	);
	
	tileList.push(
		createTileElement({
			title: "Laser Ninja Soundtrack",
			iframeSrc: "https://bandcamp.com/EmbeddedPlayer/album=1482127870/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/"
		})
	);
	
	tileList.push(
		createTileElement({
			iframeSrc: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/5658250&amp;color=222222&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
			columns: 2,
		})
	);

	for (let tile of tileList){
		musicReleases.appendChild(tile);
	}
	
}

function createAudioTiles() {
	let audioDesigns = document.getElementById("audio-designs");
	let tileList = [];

	tileList.push(
		createTileElement({
			title: "Game Audio Demo Reel",
			iframeSrc: "https://player.vimeo.com/video/246142268",
			columns: 2,
		})
	);

	tileList.push(
		createTileElement({
			title: "Q Beam Redesign (Prey)",
			iframeSrc: "https://www.youtube.com/embed/ZtTWx3GXiHg"
		})
	);

	tileList.push(
		createTileElement({
			title: "Bonehoard Ambience Redesign (Thief)",
			iframeSrc: "https://www.youtube.com/embed/MDpXmNo0_f4"
		})
	);

	tileList.push(
		createTileElement({
			title: "Time Stop Redesign (Dishonored)",
			iframeSrc: "https://www.youtube.com/embed/Qdld-EYhWOs"
		})
	);

	tileList.push(
		createTileElement({
			title: "Psychostatic Cutter Redesign (Prey)",
			iframeSrc: "https://www.youtube.com/embed/8z8JDw693Wk"
		})
	);

	for (let tile of tileList) {
		audioDesigns.appendChild(tile);
	}
}

function createTileElement(def) {
	let floatContainer = document.createElement("div");
	floatContainer.classList.add("tile-container", "smooth-expand");

	let colClass;
	switch(def?.columns) {
		case 2: {
			colClass = "two-column";
		} break;

		case 3: {
			colClass = "three-column";
		} break;

		default: {
			colClass = "one-column";
		} break;
	}
	floatContainer.classList.add(colClass);

	let floatTile = document.createElement("div");
	floatTile.classList.add("tile-content");
	
	if (def.href) {
		let anchor = document.createElement("a");
		anchor.href = def?.href;
		floatContainer.appendChild(anchor);
		anchor.appendChild(floatTile);
	} else {
		floatContainer.appendChild(floatTile);
	}

	if(def.iframeSrc) {
		let frame = document.createElement("iframe");
		frame.src = def.iframeSrc;
		frame.allowfullscreen = "allowfullscreen";
		frame.loading = "lazy";
		frame.width = "99.6%";
		frame.height = "99.6%";
		floatTile.appendChild(frame);
	} else {
		// Video/Image shown on hover
		if (def.videoSrc) {
			let showVideo = document.createElement("video");
			showVideo.autoplay = true;
			showVideo.loop = true;
			showVideo.muted = true;
			showVideo.classList.add("show-on-hover");
			showVideo.src = def.videoSrc;

			floatTile.appendChild(showVideo);
		} else if (def.img2Src) {
			let showImage = document.createElement("img");
			showImage.loading = "lazy";
			showImage.src = def.img2Src;
			showImage.classList.add("show-on-hover");

			floatTile.appendChild(showImage);
		}

		// Image hidden on hover
		if (def.imgSrc) {
			let hideImage = document.createElement("img");
			hideImage.src = def.imgSrc;
			if (def.img2Src || def.videoSrc) hideImage.classList.add("hide-on-hover");
			
			floatTile.appendChild(hideImage);
		}
	}


	if (def.title) {
		let title = document.createElement("div");
		title.innerText = def.title;
		title.classList.add("show-on-hover");
		title.style = "width: 100%; position: absolute; bottom: -1.25em; text-align: center; background-color: rgba(0,0,0, 0.25);";
		floatTile.appendChild(title);
	}

	return floatContainer;
}