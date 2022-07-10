class element_def {
	constructor(definition) {
		this.tagName = definition.tagName || '';
		this.className = definition.className || '';
		this.id = definition.id || '';
		this.href = definition.href || '';
		this.src = definition.src || '';
		this.target = definition.target || '';
		this.text = definition.text || '';
		this.style = definition.style || {};
		this.children = definition.children || [];

		this.width = definition.width || null;
		this.height = definition.height || null;
	}
}

function parseElementDefinition(e) {
	let element = new element_def(e);
	console.log(element);
	let result = document.createElement(element.tagName);
	
	if (element.className) result.className = element.className;
	if (element.id) result.id = element.id;
	if (element.href) result.href = element.href;
	if (element.src) result.src = element.src;
	if (element.text) result.innerHTML = element.text;
	if (element.width) result.width = element.width;
	if (element.height) result.height = element.height;
	
	for (let [property, value] of Object.entries(element.style)) {
		result.style[property] = value;
	}
	
	let length = element.children.length;
	for (let i = 0; i < length; i++) {
		let child = element.children[i];
		result.appendChild(
			parseElementDefinition(child)
		);
	}

	return result;
}

export function parsePageDefinition(page) {
	let result = document.createElement("div");

	for (let element of page) {
		result.appendChild(
			parseElementDefinition(element)
		);
	}

	return result;
}