document.addEventListener("DOMContentLoaded", function(event) {
	safari.self.addEventListener("message", handleMessage);
	safari.extension.dispatchMessage("Hello World!");
});

function handleMessage(event) {
	//console.log(event.name);
	//console.log(event.message);

	console.log("here goes");

	var urls = new Set();

	walkTheDOM(document.body, function (node) {
		if ( node.nodeName == 'A' ) {
			if ( node.attributes ) {
				var href = node.attributes.getNamedItem('href');
				
				if ( href ) {
					var url = href.nodeValue;
					var re1 = /\.jpg$/i;
					var re2 = /\.png$/i;
					var re3 = /\.gif$/i;

					if ( url.match(re1) || url.match(re2) || url.match(re3) ) {
						urls.add(url);
					}
				}
			}
		}
	});
	
	html = "";
	
	urls.forEach(function (u) {
		html += "<img src=\"" + u + "\" width=\"800\"><p>";
	});
	
	console.log(html);
	
	document.body.innerHTML = html;
}

function walkTheDOM(node, func) {
	func(node);
	
	node = node.firstChild;
	
	while (node) {
		walkTheDOM(node, func);
		node = node.nextSibling;
	}
}

