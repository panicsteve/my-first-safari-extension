document.addEventListener("DOMContentLoaded", function(event) {
	// Set us up to receive messages from the app
	
	safari.self.addEventListener("message", handleMessage);

	// Send a message back to the application. Doesn't do anything
	// in this example, but this is how you do it.

	safari.extension.dispatchMessage("Hello World!");
});

function handleMessage(event) {
	//console.log(event.name);
	//console.log(event.message);

	var urls = new Set();

	walkTheDOM(document.body, function (node) {
		if ( node.nodeName == 'A' ) {

			// Found an <A> tag
			
			if ( node.attributes ) {
				var href = node.attributes.getNamedItem('href');

				// Found an HREF attribute on the <A> tag
			
				if ( href ) {
					var url = href.nodeValue;
					
					// See if URL in HREF refers to a jpg, png, or gif
					
					var re1 = /\.jpg$/i;
					var re2 = /\.png$/i;
					var re3 = /\.gif$/i;

					if ( url.match(re1) || url.match(re2) || url.match(re3) ) {
						// It does, add it to the urls array
			   
						urls.add(url);
					}
				}
			}
		}
	});

	// Create an HTML string consisting of <IMG> tags referencing
	// the images from the HREFs

	var html = "";
	
	urls.forEach(function (u) {
		html += "<img src=\"" + u + "\" width=\"800\"><p>";
	});
	
	// Rewrite the document with this HTML string
	
	document.body.innerHTML = html;
}

function walkTheDOM(node, func) {
	// Recursively walk the DOM

	func(node);
	
	node = node.firstChild;
	
	while (node) {
		walkTheDOM(node, func);
		node = node.nextSibling;
	}
}

