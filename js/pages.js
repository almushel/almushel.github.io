export let banner = [
	{	tagName: "div", className: "top-banner",
		children: [
			{	tagName: "h1", text: "Andrew Mushel"},
			{	tagName: "h4", text: "High performance ludic software"}
		]

	}
];

export let sideNav = [
	{
		tagName: "nav", className: "side-nav",
		children: [
			{tagName: "div", text: "Menu", className: "icon"},
			{tagName: "a", text: "Home", href: "#top",},
			{tagName: "a", text: "About", href: "#about",},
			{tagName: "a", text: "Games", href: "#games",},
			{tagName: "a", text: "Music", href: "#music",},
			{tagName: "a", text: "Audio", href: "#audio",},
			{tagName: "a", text: "Articles", href: "./articles",},
		]
	},
];

// NOTE: Not correctly centered on large screen view. CSS sucks,

export let social = [
	{tagName: "nav", className: "social-links",
		children: [
			{tagName: "a", href: "https://almushel.itch.io", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/itch.svg"}
				]
			},
			{tagName: "a", href: "https://github.com/almushel/", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/github.svg"}
				]
			},
			{tagName: "a", href: "https://soundcloud.com/almushel", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/soundcloud.svg"}
				]
			},
			{tagName: "a", href: "http://linkedin.com/in/andrew-mushel", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/linkedin.svg"}
				]
			},
			{tagName: "a", href: "https://twitter.com/almushel", target: "_blank",
				children: [
					{	tagName: "img", className: "icon", src: "/images/twitter.svg"}
				]
			},
		]
	}
];

export let portfolio = [
		{ 	tagName: "div", className: 'section-banner', id: 'about',
			children: [
				{tagName: "h2", text: "ABOUT ME",}
			]
		},
	
		{	tagName: "div", className: "content",
			children: [
				{ tagName: "p",
					text: "Working and learning to create beautiful and functional things, because making ugly, \
							broken things is easy and far too common."
				},
				{	tagName: "p",
					text: "Recovering JavaScript programmer (never used any of the popular frameworks). \
							Now primarily using C (C99) for personal projects and not missing any of the Syntactic Sugar.\
							Low carb programming."
				},
				{	tagName: "p", text: "Musician:",
					children: [
						{	tagName: "ul",
							children: [
								{ tagName: "li", text: "Vocalist (Tenor)", },
								{ tagName: "li", text: "Pianist (Competent)" },
								{ tagName: "li", text: "Sightreader (Poor)" },
								{ tagName: "li", text: "Composer (Electronic)" },
							]
						}
					]
	
				},
				{	tagName: "p",
					text: "9 years of professional experience in technical writing/communication, training development, online learning, multimedia."
				},
	
			],
		}, // End of About Me
	
		{ 	tagName: "div", className: 'section-banner', id: 'games',
			children: [
				{tagName: "h2", text: "GAMES",}
			]
		},
	
		{	tagName: "div", className: "content",
			children: [
				{tagName: "h4", style: {width: "100%", float: "left"}, text: "My Games"},
				{tagName: "div",
					text: "<div id=\"lootnotfound\" class=\"third-float-container smooth-expand\" title=\"Loot Not Found\">\
					<a href=\"https://js13kgames.com/entries/loot-not-found\" target=\"_blank\">\
						<div class=\"third-float-tile\">\
							<video preload=\"none\" autoplay loop muted width=\"99.9%\" height=\"99.9%\" class=\"show-on-hover\"\
								style=\"position:absolute; background: black;\">\
								<source src=\"./videos/loot-not-found.mp4\" type=\"video/mp4\">\
							</video>\
							<img src=\"./images/lootnotfound.png\" alt=\"Loot Not Found\" class=\"hide-on-hover\"\
								style=\"width: 100%; height: auto;\">\
						</div>\
					</a>\
				</div>\
	\
				<div class=\"third-float-container smooth-expand\" title=\"Space Drifter\">\
					<a href=\"https://almushel.itch.io/space-drifter\">\
						<div class=\"third-float-tile\">\
							<video autoplay loop muted width=\"99.9%\" height=\"99.9%\" class=\"show-on-hover\"\
								style=\"position:absolute; background: black;\">\
								<source src=\"./videos/space-drifter.mp4\" type=\"video/mp4\">\
							</video>\
							<img src=\"./images/space-drifter.png\" alt=\"Loot Not Found\" class=\"hide-on-hover\"\
								style=\"width: 100%; height: auto; position:absolute; z-index: 2;\">\
						</div>\
					</a>\
				</div>\
				<div id=\"js-raycaster\" class=\"third-float-container smooth-expand\" title=\"JS Raycaster\">\
					<a href=\"./portfolio/js-raycaster.html\">\
						<div class=\"third-float-tile\">\
							<img src=\"./images/js-raycaster.png\" alt=\"Loot Not Found\" style=\"width: 100%; height: auto;\">\
						</div>\
					</a>\
				</div>"
				},
	
				{tagName: "h4", style: {width: "100%", float: "left"}, text: "Collaborations"},
				{tagName: "div",
					text: "<div id=\"glacierbound\" class=\"third-float-container smooth-expand\" title=\"Glacierbound\">\
					<a href=\"./portfolio/glacierbound.html\">\
	\
						<div class=\"third-float-tile\">\
							<img src=\"./images/glacierbound.png\" alt=\"Glacierbound logo\" class=\"hide-on-hover\"\
								style=\"width: 100%; height: auto; position: absolute;\">\
							<img src=\"./images/glacierbound-gameplay.gif\" alt=\"Glacierbound Gameplay\"\
								class=\"show-on-hover vertical-center\"\
								style=\"width: 100%; position: absolute; align-self: center;\">\
						</div>\
					</a>\
				</div>\
	\
				<div id=\"videonok\" class=\"third-float-container smooth-expand\" title=\"Video Nok\">\
					<a href=\"./portfolio/video-nok.html\">\
						<div class=\"third-float-tile\">\
							<img src=\"./images/video-nok.png\" alt=\"Video Nok logo\" class=\"hide-on-hover\"\
								style=\"width: 100%; height: auto; position: absolute;\">\
							<img src=\"./images/video-nok-gameplay.gif\" alt=\"Video Nok Gameplay\"\
								class=\"show-on-hover vertical-center\"\
								style=\"width: 100%; position: absolute; align-self: center;\">\
						</div>\
					</a>\
				</div>\
	\
				<div id=\"ghostrustlers\" class=\"third-float-container smooth-expand\" title=\"Ghost Rustlers\">\
					<a href=\"./portfolio/ghostrustlers.html\">\
						<div class=\"third-float-tile\">\
							<img src=\"./images/ghost-rustlers.png\" alt=\"Ghost Rustlers logo\" class=\"hide-on-hover\"\
								style=\"width: 100%; height: auto; position: absolute;\">\
							<img src=\"./images/ghost-rustlers-gameplay.gif\" alt=\"Ghost Rustlers Gameplay\"\
								class=\"show-on-hover vertical-center\"\
								style=\"width: 100%; position: absolute; align-self: center;\">\
						</div>\
					</a>\
				</div>\
				\
				<div id=\"falldale\" class=\"third-float-container smooth-expand\" title=\"Falldale\">\
					<a href=\"./portfolio/falldale.html\">\
					<div class=\"third-float-tile\">\
						<img src=\"./images/falldale.png\" alt=\"Falldale EE Logo\" class=\"hide-on-hover\" style=\"width: 100%; height: auto; position: absolute;\">\
						<img src=\"./images/falldale-ee-gameplay.gif\" alt=\"Falldale EE Gameplay\"\
								class=\"show-on-hover vertical-center\"\
								style=\"width: 100%; position: absolute; align-self: center;\">\
					</div>\
					</a>\
				</div>\
	\
				<div id=\"g-type\" class=\"third-float-container smooth-expand\" title=\"G-Type\">\
					<a href=\"./portfolio/g-type.html\">\
						<div class=\"third-float-tile\" style=\"overflow: hidden;\">\
							<img src=\"./images/g-type.png\" alt=\"G-Type logo\" class=\"hide-on-hover\" style=\"width: 100%; height: auto; position: absolute;\">\
							<img src=\"./images/g-type-gameplay.gif\" alt=\"G-Type Gameplay\"\
								class=\"show-on-hover vertical-center\"\
								style=\"width: 111.25%; position: absolute; left: 49.5%; transform: translate(-50%, -50%);\">\
						</div>\
					</a>\
				</div>\
	\
				<div id=\"hardglitch\" class=\"third-float-container smooth-expand\" title=\"Hard Glitch\">\
					<a href=\"https://klaim.itch.io/hardglitch\">\
						<div class=\"third-float-tile\">\
							<img src=\"./images/hardglitch.png\" alt=\"Falldale EE Logo\" class=\"hide-on-hover\" style=\"width: 100%; height: auto; position: absolute;\">\
							<img src=\"./images/hardglitch-gameplay.gif\" alt=\"Hard Glitch Gameplay\"\
									class=\"show-on-hover vertical-center\"\
									style=\"width: 100%; position: absolute; align-self: center;\">\
						</div>\
					</a>\
				</div>\
	\
				<div id=\"cryptoclash\" class=\"third-float-container smooth-expand\" title=\"CryptoClash\">\
					<a href=\"https://globalgamejam.org/2018/games/cryptoclash\">\
						<img src=\"./images/CryptoClash.jpg\" alt=\"Cryptoclash thumbnail\" class=\"third-float-tile\"></a>\
					<a href=\"https://vimeo.com/253858256\">Gameplay Video</a>\
					<a href=\"https://almushel.github.io/CryptoClash/\">\
						<Play it in your Browser>\
					</a></p>\
				</div>\
	\
				<div id=\"flipside\" class=\"third-float-container smooth-expand\" title=\"Flipside\">\
					<a href=\"https://gamkedo.itch.io/flipside\" target=\"_blank\">\
						<img src=\"./images/flipside.png\" alt=\"Flipside logo\" class=\"third-float-tile\" loading=\"lazy\"></a>\
					</a></p>\
				</div>\
	\
				<div id=\"slimesquest\" class=\"third-float-container smooth-expand\" title=\"A Slime's Quest for Freedom\">\
					<a href=\"https://hrgames.itch.io/a-slimes-quest-for-freedom\">\
						<img src=\"./images/ASQFF.jpg\" alt=\"A Slime's Quest for Freedom logo\" class=\"third-float-tile\"></a>\
				</div>"
			},
			]
		}, // End of Games
	
		{ 	tagName: "div", className: 'section-banner', id: 'music',
			children: [
				{tagName: "h2", text: "MUSIC",}
			]
		},
	
		{tagName: "div", className: "content",
			children: [
				{tagName: "div", 
				text: "<div class=\"third-float-container smooth-expand\">\
					<iframe class=\"third-float-tile\"\
						src=\"https://bandcamp.com/EmbeddedPlayer/album=592038833/size=large/bgcol=ffffff/linkcol=0687f5/minimal=true/transparent=true/\"\
						width=\"300\" height=\"150\" scrolling=\"no\" allowfullscreen=\"allowfullscreen\"></iframe></div>\
					<div class=\"third-float-container smooth-expand\">\
						<iframe class=\"third-float-tile\"\
							src=\"https://bandcamp.com/EmbeddedPlayer/size=large/bgcol=333333/linkcol=ffffff/minimal=true/track=3837871122/transparent=true/\"\
							width=\"300\" height=\"150\" scrolling=\"no\" allowfullscreen=\"allowfullscreen\"></iframe></div>\
					<div class=\"third-float-container smooth-expand\">\
						<iframe class=\"third-float-tile\"\
							src=\"https://bandcamp.com/EmbeddedPlayer/album=2796591934/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/\"\
							width=\"300\" height=\"150\" scrolling=\"no\" allowfullscreen=\"allowfullscreen\"></iframe></div>\
					<div class=\"third-float-container smooth-expand\">\
						<iframe class=\"third-float-tile\"\
							src=\"https://bandcamp.com/EmbeddedPlayer/album=1482127870/size=large/bgcol=333333/linkcol=ffffff/minimal=true/transparent=true/\"\
							width=\"300\" height=\"150\" scrolling=\"no\" allowfullscreen=\"allowfullscreen\"></iframe></div>\
					<p>&nbsp;</p>\
					<p><iframe\
						src=\"https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/5658250&amp;color=222222&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false\"\
						width=\"100%\" height=\"550\" frameborder=\"no\" scrolling=\"no\"></iframe>\
					</p>"
				},
			]
		},
	
		{ 	tagName: "div", className: 'section-banner', id: 'audio',
			children: [
				{tagName: "h2", text: "AUDIO DESIGN",}
			]
		},
	
		{	tagName: "div", className: 'content',
			text: "<div class=\"two-third-float-container smooth-expand\">\
				<iframe src=\"https://player.vimeo.com/video/246142268\" width=\"100%\" height=\"auto\" frameborder=\"0\"\
					allowfullscreen=\"allowfullscreen\" class=\"third-float-tile\"></iframe>\
				</div>\
	\
				<div class=\"third-float-container\">\
					<iframe src=\"https://www.youtube.com/embed/ZtTWx3GXiHg\" width=\"100%\" height=\"auto\" frameborder=\"0\"\
						allowfullscreen=\"allowfullscreen\" class=\"third-float-tile\" loading=\"lazy\"></iframe>\
				</div>\
	\
				<div class=\"third-float-container\">\
					<iframe src=\"https://www.youtube.com/embed/MDpXmNo0_f4\" width=\"100%\" height=\"auto\" frameborder=\"0\"\
						allowfullscreen=\"allowfullscreen\" class=\"third-float-tile\" loading=\"lazy\"></iframe>\
				</div>\
	\
				<div class=\"third-float-container\">\
					<iframe src=\"https://www.youtube.com/embed/Qdld-EYhWOs\" width=\"100%\" height=\"auto\" frameborder=\"0\"\
						allowfullscreen=\"allowfullscreen\" class=\"third-float-tile\" loading=\"lazy\"></iframe>\
				</div>\
	\
				<div class=\"third-float-container\">\
					<iframe src=\"https://www.youtube.com/embed/8z8JDw693Wk\" width=\"100%\" height=\"auto\" frameborder=\"0\"\
						allowfullscreen=\"allowfullscreen\" class=\"third-float-tile\" loading=\"lazy\"></iframe>\
				</div>"
		}
	];