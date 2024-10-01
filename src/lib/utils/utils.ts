export function observeCSSVariables(
	targetElement: HTMLElement,
	callback: () => void,
): MutationObserver {
	const observer = new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (
				mutation.type === "attributes" &&
				(mutation.attributeName === "style" ||
					mutation.attributeName === "class")
			) {
				callback();
			}
		}
	});

	observer.observe(targetElement, {
		attributes: true,
		attributeFilter: ["style", "class"],
	});

	return observer;
}