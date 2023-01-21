export default class TagFilter extends HTMLElement {
	constructor() {
		super();
		this.elements = Array.from(this.children);
		
		this.tagNames = new Set();
		this.tags = {};
		this.tagInputs = document.createElement("div");
		
//		this.categoryNames = new Set();
//		this.categories = {};
		
		const shadowRoot = this.attachShadow({mode: "open"});

		for (let child of this.elements) {
			for (let tag of this.extractElementTags(child)) this.pushTag(tag);

/* TO-DO: Rethink categories
			if (child.hasAttribute("category")) {
				this.pushToCategory(child, child.getAttribute("category"));
			} else {
				this.pushToCategory(child, "other");
			}
*/
			shadowRoot.append(child);
		}

		// Alphabetize tag checkboxes
		let tagInputsArr = Array.from(this.tagInputs.children).sort(
			(a, b) => { 
				return (
					a.title < b.title ? -1 : 
					a.title > b.title ? 1 : 0
				);
			}
		);

		for (let i of tagInputsArr) this.tagInputs.append(i);

		shadowRoot.prepend(this.tagInputs);
/*	
		for (let name of this.categoryNames) {
			let heading = document.createElement("h3");
				heading.style = "width: 100%; float: left;";
				heading.innerHTML = name.toUpperCase();
			shadowRoot.append(heading);

			for (let e of this.categories[name]) {
				shadowRoot.append(e);
			}
		}
*/
		this.updateTagFilter()
	}

	pushToCategory(element, category) {
		if (!this.categoryNames.has(category)) {
			this.categoryNames.add(category);
			this.categories[category] = [];
		}

		this.categories[category].push(element);
	}

	pushTag(tagName) {
		if (this.tags[tagName] === undefined) {
			this.tagNames.add(tagName);
			this.tags[tagName] = false;

			let container = document.createElement("span");
				container.title = tagName
					
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

			this.tagInputs.append(container);
		}
	}

	setTagState(tagName, state) {
		this.tags[tagName] = state;
	}

	updateTagFilter() {
		let tagsEnabled = [];

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
		let result = [""];

		if (element.hasAttribute("tags")) {
			result = element.getAttribute("tags").split(/\s?,\s?/);
		}

		return result;
	}
}