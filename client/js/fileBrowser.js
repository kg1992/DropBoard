/* global $ */
(function(window) {
	window.DropboxFileBrowser = function(dbx) {
		// dbx [object] : Dropbox object
		// path [string] : path to the note file. must begin with \ character to reprsent home
		//
		// implementation note : reason why data.fileBinary is not given is explained in the following urls:
		//   https://github.com/dropbox/dropbox-sdk-js/issues/88
		//   https://github.com/dropbox/dropbox-sdk-js/blob/1ad47646cfbfaac3ce337602eec9d3722df5dc16/src/download-request.js#L57
		// data.fileBlob is given isntead of data.fileBinary for client side api call
		// http://stackoverflow.com/questions/15341912/how-to-go-from-blob-to-arraybuffer
		//
		//  returns Promise object.
		//  resolved with an object that contains following properties:
		//      {
		//          content [string] : the actual content of the requested note
		//      }
		//
		this.download = path => dbx.filesDownload({
			path: path
		});

		this.uploadTextFile = function(path, content) {
			// Name	            Type            Description
			// contents	        Object          The file contents to be uploaded.
			// path	            string          Path in the user's Dropbox to save the file.
			// mode	            FilesWriteMode  Selects what to do if the file already exists.
			// autorename       boolean		    If there's a conflict, as determined by mode, have the Dropbox server try to autorename the file to avoid conflict.
			// client_modified  Timestamp	    The value to store as the client_modified timestamp. Dropbox automatically records the time at which the file was written to the Dropbox servers. It can also record an additional timestamp, provided by Dropbox desktop clients, mobile clients, and API apps of when the file was actually created or modified.
			// mute             boolean         Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If true, this tells the clients that this modification shouldn't result in a user notification.
			return dbx.filesUpload({
				path: path,
				contents: content,
				mode: 'overwrite'
			});
		};
		
		this.create = function(path, content) {
			return dbx.filesUpload({
				path: path,
				contents: content,
				mode: 'overwrite'
			});
		};
		
		this.createFolder = function(path) {
			if( path === undefined ) throw "need to specify argument 'path'";
			return dbx.filesCreateFolder({path:path});
		};

		this.delete = function(path) {
			if( path === undefined ) throw "need to specify argument 'path'";
			return dbx.filesDelete({path:path});
		};

		this.listFolder = function(path) {
			if( path === undefined ) throw "need to specify argument 'path'";
			return dbx.filesListFolder({path: path});
		};

		this.getDirectLink = function(path) {
			if( path === undefined ) throw "need to specify argument 'path'";
			return dbx.filesGetTemporaryLink({path});
		};
	};
})(window);