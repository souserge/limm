class FileManager {
  constructor() {
  }

  // read(e) {
  //     let file = e.target.files[0];
  //     if (!file) {
  //       return;
  //     }
  //     var reader = new FileReader();
  //     reader.onload = function(e) {
  //       var contents = e.target.result;
  //       displayContents(contents);
  //     };
  //     reader.readAsText(file);
  // }
  saveAsJSON(filename, text) {
    let blob = new Blob([text], {type: "application/json"});
    saveAs(blob, filename + ".json");
  }

  readAsJSON(inputID, callback) {
    console.log("readAsJSON");

    function init() {
      if (window.File && window.FileReader) {
        console.log("File API is supported!");
      } else {
        alert("This browser doesn't support the File API =(");
        return;
      }
      document.getElementById(inputID).addEventListener("change", onFileChanged);
    }

    function onFileChanged(evt) {
      console.log("fileChanged");
      let file = evt.target.files[0];
      let totalBytes = 0;
      // if (file.type.indexOf('text/') == -1) {
      //   alert("It's not a valid JSON!");
      //   return;
      // }
      let reader = new FileReader();
      reader.onload = function(evt) {
        callback(evt);
      }
      reader.readAsText(file);
    }
    init();
    //window.addEventListener('load', init);
  }
}

// function displayContents(contents) {
//   var element = document.getElementById('file-content');
//   element.innerHTML = contents;
// }
//
// document.getElementById('file-input')
//   .addEventListener('change', readSingleFile, false);

let gFileManager = new FileManager();
