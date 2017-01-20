const ASSET_TYPE = {
  IMG: 0,
  JS: 1,
  SND: 2
};
class AssetLoader {
  constructor() {
    this.cached = new Map();
    console.log(window.location.href);
  }

  load(assetList, callbackFcn) {
    let loadBatch = {
      count: 0,
      total: assetList.length,
      cb: callbackFcn
    };
    for (var i = 0; i < assetList.length; i++) {
      let filename = assetList[i];

      if (!this.cached.has(filename)) {

        let assetType = this.getAssetTypeFromExtension(filename);

        if (assetType === ASSET_TYPE.IMG) { // Asset is an image
          let img = loadImage(filename, (img) => {
            this.onLoadedCallback(img, loadBatch);
          });
          this.cached.set(filename, img);
        }
        else if (assetType === ASSET_TYPE.JS) { // Asset is Javascript
          var fileref = document.createElement('script');
          fileref.setAttribute("type", "text/javascript");
          fileref.onload = function (e){
            this.onLoadedCallback(fileref,loadBatch);
          };
          fileref.setAttribute("src", filename);
          document.getElementsByTagName("head")[0].appendChild(fileref);
          this.cached.set(filename, fileref);
        }
        else if (assetType === ASSET_TYPE.SND) {
          let snd = loadSound(filename, (snd) => {
            this.onLoadedCallback(snd, loadBatch);
          });
          this.cached.set(filename, snd);
        }
      }
      else { // Asset is already loaded
        this.onLoadedCallback(this.cached.get(filename), loadBatch);
      }
    }
  }

  onLoadedCallback(asset, batch) {
  	batch.count++;
  	if(batch.count == batch.total) {
  		batch.cb(asset);
  	}
  }

  getAssetTypeFromExtension(fname) {
  	if (fname.indexOf('.jpg') != -1 ||
        fname.indexOf('.jpeg') != -1 ||
        fname.indexOf('.png') != -1 ||
        fname.indexOf('.gif') != -1 ||
        fname.indexOf('.wp') != -1) {
  		return 0;
  	}
  	if (fname.indexOf('.js') != -1 ||
        fname.indexOf('.json') != -1) {
  		return 1;
  	}
    if (fname.indexOf('.wav') != -1 ||
        fname.indexOf('.mp3') != -1 ||
        fname.indexOf('.ogg') != -1) {
      return 2;
    }
  	return -1;
  }
}



let gAssetLoader = new AssetLoader();
