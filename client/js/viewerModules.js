/* global TextDecoder */

(function(window) {
  var beginBlobToString = function(blob) {
    return new Promise(function(resolve, reject) {
      try {
        var fileReader = new FileReader();
        fileReader.onload = function() {
          try {
            // get the result. result is saved as part of FileReader object
            var arrayBuffer = this.result;
            // decode the array buffer
            // http://stackoverflow.com/questions/8936984/uint8array-to-string-in-javascript
            var uint8ArrayNew = new Uint8Array(arrayBuffer);
            var content = new TextDecoder("utf-8").decode(uint8ArrayNew);
            // resolve on comlete reading and decoding
            resolve(content);
          }
          catch (e) {
            reject(e);
          }
        };
        // starts the 'file reading' process
        fileReader.readAsArrayBuffer(blob);
      }
      catch (e) {
        reject(e);
      }
    });
  };
      
	var imageExtensions = [".png", ".jpg", ".jpeg", ".bmp", ".tif", ".gif", ];
	var imageViewer = {
		checkMatch: function(path) {
			if (path === undefined) throw "'path' must be defined";

			var ext = getExtension(path);
			return imageExtensions.any(ext);
		},
		beginView: function(path) {
			return fb.download(path).then(data => {
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = urlCreator.createObjectURL(data.fileBlob);
				var $imageView = $('#imageView');
				var $image = $imageView.find('img');
				$image.attr('src', imageUrl);
				$imageView.css('display', 'block');
			});
		}
	};

	var txtViewer = {
		checkMatch: function(path) {
			if (path === undefined) throw "'path' must be defined";

			var ext = getExtension(path);
			return ext == ".txt";
		},

		beginView: function(path) {
			return fb.download(path).then(data => {
				beginBlobToString(data.fileBlob)
					.then(function(content) {
						// Change View
						$textEditView.val(content);
						$textEditView.css('display', 'block');
					});
			});
		}
	};

	var mdViewer = {
		checkMatch: function(path) {
			if (path === undefined) throw "'path' must be defined";

			return getExtension(path) == ".md";
		},

		beginView: function(path) {
			return fb.download(path).then(data => {
				beginBlobToString(data.fileBlob)
					.then(function(content) {
						var $mdView = $('#mdView');

						// Change View
						$textEditView.val(content);
						$textEditView.css('display', 'block');
						$mdView.css('display', 'block');

						// build md document
						buildMd();
					});
			});
		}
	};

	var htmlViewer = {
		checkMatch: function(path) {
			if (path === undefined) throw "'path' must be defined";
			var ext = getExtension(path);
			return ext == ".html" || ext == "htm";
		},

		beginView: function(path) {
			return fb.download(path).then(data => {
				beginBlobToString(data.fileBlob)
					.then(function(content) {
						editor.setValue(content);
						$codeEditView.show();
						resizeCodeEditView();
					});
			});
		}
	};

	window.viewerModules = [imageViewer, txtViewer, mdViewer, htmlViewer];
})(window);
