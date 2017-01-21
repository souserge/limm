function xhrGet(url,callback) {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);
	xhr.onload = () => {
		//console.log(xhr.responseText);
		callback(xhr);
	};
	xhr.send();
}
