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

.toggle > .arrow { float: right; }
  
.expanded .arrow {
	transform: translateY(100%) rotate(-135deg);
	-webkit-transform: translateY(100%) rotate(-135deg);
}

@media only screen and (min-width: 1280px) {
	.filter-container {
		width: 32.3%;
	}
}`
);

export class TagFilter extends HTMLElement {
	constructor() {
		super();
		const shadowRoot = this.attachShadow({mode: "closed"});
		shadowRoot.adoptedStyleSheets = [styleSheet];

		this.elements = Array.from(this.children);
		this.tagsEnabled = new Set();

		this.tagControls = document.createElement("div");
		this.tagControls.className = "filter-container";
		shadowRoot.append(this.tagControls);

		for (let child of this.elements) {
			for (let tag of this.extractElementTags(child)) this.pushTag(tag);

			shadowRoot.append(child);
		}

		if (this.tagControls.children?.length) {
			// Alphabetize tag checkboxes
			let tagInputsArray = Array.from(this.tagControls.children).sort(
				(a, b) => { 
					return (
						a.title < b.title ? -1 : 
						a.title > b.title ? 1 : 0
					);
				}
			);
			for (let i of tagInputsArray) {
				i.querySelector("input").onchange = (e) => {
					this.setTagState(e.target.parentElement.title, e.target.checked);
					this.updateTagFilter();
				};
				this.tagControls.append(i);
			}
		
			// Create filter menu toggle switch
			this.tagControls.insertAdjacentHTML("afterbegin", 
				`<div class="toggle">
					Filters<div class="arrow"></div>
				</div>`
			);
		}
	}

	connectedCallback() {
		const toggle = this.tagControls.querySelector(".toggle");
		const toggleHeight = toggle.offsetHeight-1; // Subtract the bottom border=
		const expandedHeight = this.tagControls.offsetHeight;

		styleSheet.insertRule(`:host { --container-collapsed-height: ${toggleHeight+"px"} }`);
		styleSheet.insertRule(`:host { --container-expanded-height: ${expandedHeight+"px"} }`);

		toggle.onclick = () => { toggle.parentElement.classList.toggle("expanded"); }
	}

	pushTag(tagName) {
		if (!this.tagControls.querySelector(`span[title="${tagName}"]`)) {
			const tagID = tagName+"-checkbox";

			this.tagControls.insertAdjacentHTML("beforeend", 
				`<span title="${tagName}">
					<input type="checkbox" id="${tagID}"/><label for="${tagID}">${tagName}</label>
				</span>`
			);
		}
	}

	setTagState(tagName, state) {
		if (state) this.tagsEnabled.add(tagName);
		else this.tagsEnabled.delete(tagName);
	}

	updateTagFilter() {
		for (let e of this.elements) {
			let hidden = false;
			let elementTags = new Set(this.extractElementTags(e));
			for (let filter of this.tagsEnabled) {
				if (!elementTags.has(filter)) {
					hidden = true;
					break;
				}
			}
			e.hidden = hidden;
		}
	}

	extractElementTags(element) {
		let result = element.dataset?.tags?.split(/\s?,\s?/) || [""];

		return result;
	}
}

customElements.define("tag-filter", TagFilter);
