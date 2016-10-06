// Get text area data.
var htmlTextArea = document.getElementById("html");
var plainTextArea = document.getElementById("text");
// Get button.
var toHtmlButton = document.getElementById("to-html");
var toTextButton = document.getElementById("to-txt")
// The heading.
var wrapper = document.getElementsByClassName("wrapper")[0];
// Wrapper styles.
var wrapPrevStyles = getComputedStyle(wrapper);
// Heading text.
var head = document.getElementById("head");

// This function changes the display.
var changeDisplay = function (content) {
	plainTextArea.value = content;
	console.log("[+] Success");
}



// This function really converts data to html.
var htmlToText = function (content, chars) {
	// Get keys of the whole object.
	var keys = Object.keys(chars);

	// Iterate over those keys.
	// Foreach key do a replace on the entered text.
	keys.forEach(function (key, ind) {
		console.log(ind, key, chars[key]);
		// Create new regex.
		var reg = new RegExp(key, "g");
		console.log(reg);
		content = content.replace(reg, chars[key]);
		console.log(content);
	});

	// Return new formatted content.
	changeDisplay(content);
}

// Ajax request.
var ajax = function (content, page) {
	// Create new ajax object.
	var xhr = new XMLHttpRequest();
	// Set mime type to be json.
	xhr.overrideMimeType("application/json");
	// Add an evenlistener.
	xhr.addEventListener("load", function () {
		var chars = JSON.parse(this.responseText);
		// Call the html to text function that does real conversions.
		htmlToText(content, chars);
	});
	// Open this url
	xhr.open("GET", page, true);
	xhr.send();
}

// Register click event.
toTextButton.addEventListener("click", function () {
	console.log("clicked html")
	var htmlContent = htmlTextArea.value.toString();
	var jsonAddress = "data.txt";
	ajax(htmlContent, jsonAddress);
});