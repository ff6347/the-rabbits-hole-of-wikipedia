const tocLinkClickHandler = (event) => {
	event.preventDefault();

	const url = new URL(event.target.href);

	const target = document.querySelector(url.hash);
	target.scrollIntoView({ behavior: "smooth", block: "start" });
};

window.addEventListener("load", () => {
	const params = new URLSearchParams(location.search);

	if (params.has("zoom")) {
		const docHeight = document.documentElement.scrollHeight;
		const viewportHeight = window.innerHeight;
		const scale = viewportHeight / docHeight;

		document.body.style.zoom = scale;
	}
});

document.addEventListener("DOMContentLoaded", () => {
	try {
		const title = document.querySelector(".title");
		if (!title) {
			console.error("could not find title");
			return;
		}
		title.scrollIntoView({ behavior: "smooth", block: "start" });

		const tocs = document.querySelectorAll("toc-item");

		tocs.forEach((item) => {
			item.addEventListener("click", tocLinkClickHandler);
		});

		const tocLinks = document.querySelectorAll(".toc-link");
		const targetContainers = document.querySelectorAll("section.card");

		// For each target container
		targetContainers.forEach((container) => {
			if (!container.classList.contains("navigation")) {
				// create one link that points back to the nav
				const parent = document.createElement("div");
				parent.classList.add("backlinks");
				const link = document.createElement("a");
				link.innerHTML = "Abyssinian Hare";
				link.href = "#navigation";
				link.addEventListener("click", tocLinkClickHandler);
				const tocItem = document.createElement("toc-item");
				const tocCircle = document.createElement("circle-item");
				tocItem.appendChild(tocCircle);
				tocItem.appendChild(link);
				parent.appendChild(tocItem);

				// now clone all the others
				tocLinks.forEach((link) => {
					const clone = link.cloneNode(true);
					clone.addEventListener("click", tocLinkClickHandler);
					const tocItem = document.createElement("toc-item");
					const tocCircle = document.createElement("circle-item");
					tocItem.appendChild(tocCircle);
					tocItem.appendChild(clone);
					parent.appendChild(tocItem);
					container.appendChild(parent);
				});
			}

			// Clone all TOC links and append to this container
		});

		// cleanup

		document.querySelectorAll(".cite-bracket,.reference").forEach((item) => {
			item.remove();
		});

		document.querySelectorAll("a").forEach((anchor) => {
			if (
				anchor.href?.includes("/wiki/") &&
				!anchor.classList.contains("toc-link")
			) {
				// external link lets make them point at the wikipedia again
				const url = new URL(anchor.href);
				anchor.target = "_blank";
				anchor.href = `https://en.wikipedia.org${url.pathname}`;
			}
		});
	} catch (e) {
		console.error(e);
	}
});
