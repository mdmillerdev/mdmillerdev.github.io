let filters = document.getElementsByClassName("filter");
let classes = [];
for(const element of filters) {
	classes[classes.length] = element.getAttribute("class").substring(7);
	element.addEventListener("click", function () {
		var value = element.getAttribute("value");
		if (value == null || value == 0) {
			value = 1;
			element.style.backgroundColor = "var(--accent)";
		} else {
			value = 0;
			element.style.backgroundColor = "";
		}
		element.setAttribute("value", value);
		applyFilters();
	});
}

let projects = document.getElementsByClassName("project");

function applyFilters() {
	console.log("apply filters");
	for (var k = 0; k < projects.length; k++) {
		var classAttr = projects[k].getAttribute("class");
		var removed = false;
		projects[k].style.display = "";
		for (var i = 0; i < classes.length; i++) {
			var value = filters[i].getAttribute("value");
			if (value == 1) {
				if (classAttr.indexOf(classes[i]) == -1) {
					projects[k].style.display = "none";
					removed = true;
				}
			}
		}
	}
}

console.log("end of script initialization");