class ThirdFloatTile {
	constructor(children) {
		this.tagName = "div";
		this.className = "third-float-container smooth-expand";
		this.children = [
			{	tagName: "div", className: "third-float-tile",
				children: children
			}
		]
	}
}

class LinkedThirdFloatTile extends ThirdFloatTile {
	constructor(children, link, target) {
		super(children);
		// NOTE: For some reason the third-float-tile div has to be a child of the link
		// for the hover effects to work correctly.
		let anchor = [
			{	tagName: "a", href: link, target: target || "",
				style: {position: "absolute", width: "100%", height: "100%"},
				children: this.children,
			}
		]

		this.children = anchor;
	}
}

let banner = [
	{	tagName: "div", className: "top-banner",
		children: [
			{	tagName: "h1", innerHTML: "Andrew Mushel"},
			{	tagName: "h4", innerHTML: "High performance ludic software"}
		]

	}
];

let sideNav = [
	{
		tagName: "nav", className: "side-nav",
		children: [
			{tagName: "div", innerHTML: "Menu", className: "icon"},
			{tagName: "a", innerHTML: "Home", href: "#top",},
			{tagName: "a", innerHTML: "About", href: "#about",},
			{tagName: "a", innerHTML: "Games", href: "#games",},
			{tagName: "a", innerHTML: "Music", href: "#music",},
			{tagName: "a", innerHTML: "Audio", href: "#audio",},
			{tagName: "a", innerHTML: "Articles", href: "./articles",},
		]
	},
];

// NOTE: Not correctly centered on large screen view. CSS sucks,

let social = [
	{tagName: "nav", className: "social-links",
		children: [
			{tagName: "a", className: "smooth-expand", href: "https://almushel.itch.io", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/itch.svg"}
				]
			},
			{tagName: "a", className: "smooth-expand", href: "https://github.com/almushel/", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/github.svg"}
				]
			},
			{tagName: "a", className: "smooth-expand", href: "https://soundcloud.com/almushel", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/soundcloud.svg"}
				]
			},
			{tagName: "a", className: "smooth-expand", href: "http://linkedin.com/in/andrew-mushel", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/linkedin.svg"}
				]
			},
			{tagName: "a", className: "smooth-expand", href: "https://twitter.com/almushel", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/twitter.svg"}
				]
			},
		]
	}
];

let portfolio = [
		{ 	tagName: "div", className: 'section-banner', id: 'about',
			children: [
				{tagName: "h2", innerHTML: "ABOUT ME",}
			]
		},
	
		{	tagName: "div", className: "content",
			children: [
				{ tagName: "p",
					innerHTML: "Working and learning to create beautiful and functional things, because making ugly, \
							broken things is easy and far too common."
				},
				{	tagName: "p",
					innerHTML: "Recovering JavaScript programmer (never used any of the popular frameworks). \
							Now primarily using C (C99) for personal projects and not missing any of the Syntactic Sugar.\
							Low carb programming."
				},
				{	tagName: "p", innerHTML: "Musician:",
					children: [
						{	tagName: "ul",
							children: [
								{ tagName: "li", innerHTML: "Vocalist (Tenor)", },
								{ tagName: "li", innerHTML: "Pianist (Competent)" },
								{ tagName: "li", innerHTML: "Sightreader (Poor)" },
								{ tagName: "li", innerHTML: "Composer (Electronic)" },
							]
						}
					]
	
				},
				{	tagName: "p",
					innerHTML: "9 years of professional experience in technical writing/communication, training development, online learning, multimedia."
				},
	
			],
		}, // End of About Me
	
		{ 	tagName: "div", className: 'section-banner', id: 'games',
			children: [
				{tagName: "h2", innerHTML: "GAMES",}
			]
		},
		// NOTE: <video> autoplay seems inconsistent in local testing
		{	tagName: "div", className: "content",
			children: [
				{	tagName: "h4", style: {width: "100%", float: "left"}, innerHTML: "My Games"},
				
				new LinkedThirdFloatTile([
					{	tagName: "video", className: "show-on-hover", 
						style: {position: "absolute", width: "100%", height: "100%", background: "black"},
						autoplay: "true", loop: "true", defaultMuted: "true",
						src: "./videos/loot-not-found.mp4"
					},
					{	tagName: "img", className: "hide-on-hover", src: "./images/lootnotfound.png", alt: "Loot Not Found",
						style: {width: "100%", height: "auto"}
					}
				], "https://js13kgames.com/entries/loot-not-found", "_blank"),
				
				new LinkedThirdFloatTile([
					{	tagName: "video", className: "show-on-hover", 
						style: {position: "absolute", width: "100%", height: "100%", background: "black"},
						autoplay: "true", loop: "true", defaultMuted: "true",
						src: "./videos/space-drifter.mp4"
					},
					{	tagName: "img", className: "hide-on-hover", src: "./images/space-drifter.png", alt: "Space Drifter",
						style: {width: "100%", height: "auto"}
					}
				], "https://almushel.itch.io/space-drifter", "_blank"),
				
				new LinkedThirdFloatTile([
					{	tagName: "video", className: "show-on-hover", 
						style: {position: "absolute", width: "100%", height: "100%", background: "black"},
						autoplay: "true", loop: "true", defaultMuted: "true",
						src: "./videos/js-raycaster.mp4"
					},
					{	tagName: "img", className: "hide-on-hover", src: "./images/js-raycaster.png", alt: "JS Raycaster",
						style: {width: "100%", height: "auto"}
					}
				], "./portfolio/js-raycaster.html"),
	
				{tagName: "h4", style: {width: "100%", float: "left"}, innerHTML: "Collaborations"},

				new LinkedThirdFloatTile([
					{	tagName: "img", className: "hide-on-hover", src: "./images/glacierbound.png", alt: "Glacierbound Logo",
						style: {width: "100%", height: "auto", position: "absolute"}
					},
					{	tagName: "img", className: "show-on-hover vertical-center", src: "./images/glacierbound-gameplay.gif", alt: "Glacierbound Gameplay",
						style: {position: "absolute", alignSelf: "center", width: "100%"}
					}
				], "./portfolio/glacierbound.html"),

				new LinkedThirdFloatTile([
					{	tagName: "img", className: "hide-on-hover", src: "./images/video-nok.png", alt: "Video Nok",
						style: {width: "100%", height: "auto", position: "absolute"}
					},
					{	tagName: "img", className: "show-on-hover vertical-center", src: "./images/video-nok-gameplay.gif", alt: "Video Nok Gameplay",
						style: {position: "absolute", alignSelf: "center", width: "100%"}
					}
				], "./portfolio/video-nok.html"),

				new LinkedThirdFloatTile([
					{	tagName: "img", className: "hide-on-hover", src: "./images/ghost-rustlers.png", alt: "Ghost Rustlers",
						style: {width: "100%", height: "auto", position: "absolute"}
					},
					{	tagName: "img", className: "show-on-hover vertical-center", src: "./images/ghost-rustlers-gameplay.gif", alt: "Ghost Rustlers Gameplay",
						style: {position: "absolute", alignSelf: "center", width: "100%"}
					}
				], "./portfolio/ghostrustlers.html"),

				new LinkedThirdFloatTile([
					{	tagName: "img", className: "hide-on-hover", src: "./images/falldale.png", alt: "Falldale",
						style: {width: "100%", height: "auto", position: "absolute"}
					},
					{	tagName: "img", className: "show-on-hover vertical-center", src: "./images/falldale-ee-gameplay.gif", alt: "Falldale Gameplay",
						style: {position: "absolute", alignSelf: "center", width: "100%"}
					}
				], "./portfolio/falldale.html"),

				new LinkedThirdFloatTile([
					{	tagName: "img", className: "show-on-hover vertical-center", src: "./images/g-type-gameplay.gif", alt: "G-Type Gameplay",
					style: {position: "absolute", alignSelf: "center", width: "100%"}
					},

					{	tagName: "img", className: "hide-on-hover", src: "./images/g-type.png", alt: "G-Type",
						style: {width: "100%", height: "auto", position: "absolute"}
					},
				], "./portfolio/g-type.html"),

				new LinkedThirdFloatTile([
					{	tagName: "img", className: "show-on-hover vertical-center", src: "./images/hardglitch-gameplay.gif", alt: "Hard Glitch Gameplay",
					style: {position: "absolute", alignSelf: "center", width: "100%"}
					},

					{	tagName: "img", className: "hide-on-hover", src: "./images/hardglitch.png", alt: "Hard Glitch",
						style: {width: "100%", height: "auto", position: "absolute"}
					},
				], "https://klaim.itch.io/hardglitch", "_blank"),

				new LinkedThirdFloatTile([
					{	tagName: "img", src: "./images/cryptoclash.jpg", alt: "CryptoClash",
						style: {position: "absolute", width: "100%"}
					},
				], "https://globalgamejam.org/2018/games/cryptoclash", "_blank"),

				new LinkedThirdFloatTile([
					{	tagName: "img", src: "./images/flipside.png", alt: "Flipside",
						style: {position: "absolute", width: "100%"}
					},
				], "https://gamkedo.itch.io/flipside", "_blank"),

				new LinkedThirdFloatTile([
					{	tagName: "img", src: "./images/ASQFF.jpg", alt: "A Slime's Quest for Freedom",
						style: {position: "absolute", width: "100%"}
					},
				], "https://hrgames.itch.io/a-slimes-quest-for-freedom", "_blank"),
			]
		}, // End of Games
	
		{ 	tagName: "div", className: 'section-banner', id: 'music',
			children: [
				{tagName: "h2", innerHTML: "MUSIC",}
			]
		},
	
		{tagName: "div", className: "content",
			children: [
				new ThirdFloatTile([
					{	tagName: "iframe",
						src: "https://bandcamp.com/EmbeddedPlayer/album=592038833/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/",
						style: {width: "100%", height: "100%"},
						loading: "lazy", scrolling: "no", allowfullscreen: "allowfullscreen"
					}
				]),

				new ThirdFloatTile([
					{	tagName: "iframe",
						src: "https://bandcamp.com/EmbeddedPlayer/size=large/bgcol=333333/linkcol=ffffff/minimal=true/track=3837871122/transparent=true/",
						style: {width: "100%", height: "100%"},
						loading: "lazy", scrolling: "no", allowfullscreen: "allowfullscreen"
					}
				]),

				new ThirdFloatTile([
					{	tagName: "iframe",
						src: "https://bandcamp.com/EmbeddedPlayer/album=2796591934/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/",
						style: {width: "100%", height: "100%"},
						loading: "lazy", scrolling: "no", allowfullscreen: "allowfullscreen"
					}
				]),

				new ThirdFloatTile([
					{	tagName: "iframe",
						src: "https://bandcamp.com/EmbeddedPlayer/album=1482127870/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/",
						style: {width: "100%", height: "100%"},
						loading: "lazy", scrolling: "no", allowfullscreen: "allowfullscreen"
					}
				]),

				{	tagName: "iframe", 
					src: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/5658250&amp;color=222222&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false",
					loading: "lazy", frameborder: "no", scrolling: "no",
					style: {marginTop: "1em", width: "100%", height: "550px"}
				}

			]
		},
	
		{ 	tagName: "div", className: 'section-banner', id: 'audio',
			children: [
				{tagName: "h2", innerHTML: "AUDIO DESIGN",}
			]
		},
	
		{	tagName: "div", className: 'content',
			children: [
				{	tagName: "div", className: "two-third-float-container smooth-expand",
					children: [
						{	tagName: "iframe", className: "third-float-tile",
							src: "https://player.vimeo.com/video/246142268",
							style: {width: "100%"}, frameborder: 0, allowfullscreen: "allowfullscreen" 
						}
					]
				},

				new ThirdFloatTile(
					[{	tagName: "iframe", src: "https://www.youtube.com/embed/ZtTWx3GXiHg",
						width: "100%", height: "100%", frameborder: 0, allowfullscreen: "allowfullscreen", loading: "lazy"
					}]
				),

				new ThirdFloatTile(
					[{	tagName: "iframe", src: "https://www.youtube.com/embed/MDpXmNo0_f4",
						width: "100%", height: "100%", frameborder: 0, allowfullscreen: "allowfullscreen", loading: "lazy"
					}]
				),

				new ThirdFloatTile(
					[{	tagName: "iframe", src: "https://www.youtube.com/embed/Qdld-EYhWOs",
						width: "100%", height: "100%", frameborder: 0, allowfullscreen: "allowfullscreen", loading: "lazy"
					}]
				),

				new ThirdFloatTile(
					[{	tagName: "iframe", src: "https://www.youtube.com/embed/8z8JDw693Wk",
						width: "100%", height: "100%", frameborder: 0, allowfullscreen: "allowfullscreen", loading: "lazy"
					}]
				),
			],
		}
	];

export const homePage = [].concat(banner, sideNav, portfolio, social);