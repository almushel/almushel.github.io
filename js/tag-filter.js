const styleSheet = new CSSStyleSheet()
styleSheet.replaceSync(`
.filter-container {
	overflow: hidden;
	
	width: 49%;
	height: var(--container-collapsed-height, auto);
	margin: 0% 1% 1% 0;
	
	background: var(--bg-color-1);
	border: 1px solid rgba(0,0,0,0);

	transition: height .25s;
}

.filter-container:hover {
	border: 1px solid var(--accent-color);
}

.filter-container label {
	vertical-align: top;
}

.filter-container > span {
	display: block;
	padding-bottom: 0.25em;
	margin: 0;
}

.filter-container .toggle {
	display: block;
	padding: .25em;
	margin-bottom: .25em;
	border-bottom: 1px solid var(--bg-color-3);
	cursor: pointer;
}

.filter-container .toggle:hover {
	background: var(--bg-color-2);
}

.filter-container.expanded {
	height: var(--container-expanded-height, auto);
}

.arrow {
	border: solid white;
	border-width: 0 3px 3px 0;
	display: inline-block;
	margin-top: -.125em;
	margin-right: .25em;
	
	padding: .25em;

	transition: transform .25s;
	transform: translateY(50%) rotate(45deg);
	-webkit-transform: translateY(50%) rotate(45deg);
}
  
.expanded .arrow {
	transform: translateY(100%) rotate(-135deg);
	-webkit-transform: translateY(100%) rotate(-135deg);
}

@media only screen and (min-width: 1280px) {
	.filter-container {
		width: 32.3%;
	}
}
`);

export default class TagFilter extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: "closed"});
		shadowRoot.adoptedStyleSheets = [styleSheet];

		this.elements = Array.from(this.children);
		this.tagNames = new Set();
		this.tags = {};
		this.tagControls = document.createElement("div");
		this.tagControls.className = "filter-container";
		shadowRoot.append(this.tagControls);

		for (let child of this.elements) {
			for (let tag of this.extractElementTags(child)) this.pushTag(tag);

			shadowRoot.append(child);
		}

		if (this.tagNames.size) {
			// Alphabetize tag checkboxes
			let tagInputsArr = Array.from(this.tagControls.children).sort(
				(a, b) => { 
					return (
						a.title < b.title ? -1 : 
						a.title > b.title ? 1 : 0
					);
				}
			);
			for (let i of tagInputsArr) this.tagControls.append(i);
		
			// Create filter menu toggle switch
			let containerToggle = document.createElement("div");
				containerToggle.innerHTML = `Filters <div class="arrow up" style="float: right;"></div>`;
				containerToggle.classList.add("toggle");
	
			this.tagControls.prepend(containerToggle);
		}

		this.updateTagFilter()
	}

	connectedCallback() {
		const toggle = this.tagControls.querySelector(".toggle");
		const toggleHeight = toggle.getBoundingClientRect().height-1; // Subtract the bottom border
		const checkBoxHeight = this.tagControls.querySelector("span").getBoundingClientRect().height;
		// NOTE: expandedHeight is always short the equivalent of one checkbox span padding-bottom value (.25em or 4px)
		const expandedHeight = (toggleHeight+1) + this.tagNames.size * checkBoxHeight;

		styleSheet.insertRule(`:host { --container-collapsed-height: ${toggleHeight+"px"} }`);
		styleSheet.insertRule(`:host { --container-expanded-height: ${expandedHeight+"px"} }`);

		toggle.onclick = () => { toggle.parentElement.classList.toggle("expanded"); }
	}

	pushTag(tagName) {
		if (!this.tagNames.has(tagName)) {
			this.tagNames.add(tagName);
			this.tags[tagName] = false;

			let container = document.createElement("span");
				container.title = tagName;
					
			let checkbox = document.createElement("input");
				checkbox.type = "checkbox";
				checkbox.id = tagName + "-checkbox";
				checkbox.checked = false;
				checkbox.onchange = (e) => {
					this.setTagState(e.target.parentElement.title, e.target.checked);
					this.updateTagFilter();
				};
			
			let label = document.createElement("label");
				label.for = checkbox.id;
				label.innerHTML = tagName;
			
			container.append(checkbox, label);

			this.tagControls.append(container);
		}
	}

	setTagState(tagName, state) {
		this.tags[tagName] = state;
	}

	updateTagFilter() {
		let tagsEnabled = [];

		// TO-DO: store enabled state somewhere
		for (let name of this.tagNames) {
			if (this.tags[name] == true) tagsEnabled.push(name);
		}

		for (let e of this.elements) {
			let hidden = false;
			let elementTags = new Set(this.extractElementTags(e));
			for (let filter of tagsEnabled) {
				if (!elementTags.has(filter)) hidden = true;
			}
			e.hidden = hidden;
		}
	}

	extractElementTags(element) {
		let result = element.dataset?.tags?.split(/\s?,\s?/) || [""];

		return result;
	}
}