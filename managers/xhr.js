function xhrGet(url,callback) {
	var xhr = new XMLHttpRequest();

	xhr.open("GET", url, true);
	xhr.onload = callback;

	xhr.send();
}
