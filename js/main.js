import Router from "./router.js";

new Router(
	{
		"/": "/pages/home.html",
		"/about": "/pages/about.html",
		"/contact": "/pages/contact.html"
	},
	"/pages/404.html"     // <- separate HTML file for 404
);

