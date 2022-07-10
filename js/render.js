function renderElement(element) {
	let result = document.createElement(element.tagName);

	for (let [property, value] of Object.entries(element)) {
		if (property === "style") {
			for (let [sProperty, sValue] of Object.entries(element.style)) {
				result.style[sProperty] = sValue;
			}
		}
		else {
			// TO-DO: Figure how to check ALL of the properties
			let descriptor = Object.getOwnPropertyDescriptor(Element.prototype, property);
			let writable = (typeof descriptor !== "undefined") && (typeof descriptor.set !== "undefined");

			descriptor = Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype, property);
			writable |= (typeof descriptor !== "undefined") && (typeof descriptor.set !== "undefined");

			descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(result), property);
			writable |= (typeof descriptor !== "undefined") && (typeof descriptor.set !== "undefined");
			
			if (value && writable) {
				result[property] = value;
			}
		}
	}

	if (typeof element.children !== "undefined") {
		let length = element.children.length;
		for (let i = 0; i < length; i++) {
			let child = element.children[i];
			result.appendChild(
				renderElement(child)
			);
		}
	}

	return result;
}

export function renderPage(page) {
	let result = document.createElement("div");

	for (let element of page) {
		result.appendChild(
			renderElement(element)
		);
	}

	return result;
}