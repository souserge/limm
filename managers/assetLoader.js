class AssetLoader {
  constructor() {
    this.cached = new Map();
  }

  load(assetList, callbackFcn) {
    let loadBatch = {
      count: 0,
      total: assetList.length,
      cb: callbackFcn
    };
    for (var i = 0; i < assetList.length; i++) {
      if (!this.cached.has(assetList[i])) {
        let assetType = this.getAssetTypeFromExtension(assetList[i]);
        if (assetType === 0) { // Asset is an image
          let img = loadImage(assetList[i], (img) => {
            this.onLoadedCallback(img, loadBatch);
          });
          this.cached.set(assetList[i], img);
        } else if (assetType === 1) { // Asset is Javascript
          var fileref = document.createElement('script');
          fileref.setAttribute("type", "text/javascript");
          fileref.onload = function (e){
            this.onLoadedCallback(fileref,loadBatch);
          };
          fileref.setAttribute("src", filename);
          document.getElementsByTagName("head")[0].appendChild(fileref);
          this.cached.set(assetList[i], fileref);
        }
      } else { // Asset is already loaded
        this.onLoadedCallback(this.cached.get(assetList[i]), loadBatch);
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
  	return -1;
  }
}

let gAssetLoader = new AssetLoader();
