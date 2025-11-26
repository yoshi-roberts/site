class Router {
	constructor(routes, notFoundPage) {
		this.routes = routes;              // { "/": "/pages/home.html", ... }
		this.notFoundPage = notFoundPage;  // "/pages/404.html"
		this.root = document.getElementById("content");

		this.handle = this.handle.bind(this);

		window.addEventListener("popstate", this.handle);

		document.addEventListener("click", (e) => {
			const link = e.target.closest("a[data-link]");
			if (!link) return;
			e.preventDefault();
			history.pushState(null, "", link.href);
			this.handle();
		});

		this.handle();
	}

	async loadPage(filepath) {
		try {
			const response = await fetch(filepath);

			if (!response.ok) {
				// Failed to load file → load 404 page
				const notFound = await fetch(this.notFoundPage).then(r => r.text());
				this.root.innerHTML = notFound;
				return;
			}

			this.root.innerHTML = await response.text();

		} catch (err) {
			// Major error → also load 404 page
			const notFound = await fetch(this.notFoundPage).then(r => r.text());
			this.root.innerHTML = notFound;
		}
	}

	handle() {
		const path = window.location.pathname;
		const file = this.routes[path];

		if (!file) {
			// Route not found → load 404 html
			this.loadPage(this.notFoundPage);
		} else {
			this.loadPage(file);
		}
	}
}

export default Router;

