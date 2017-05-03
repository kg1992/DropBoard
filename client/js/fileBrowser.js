/* global $ */
(function(window) {
	window.DropboxFileBrowser = function(dbx) {
		// // to model note list
		// var notes_model = function(entries) {
		// 	// the original source of this data model
		// 	this.entries = entries
		// 		// I'd like to keep only txt, md files on the list
		// 		.filter(function(e) {
		// 			return e.name.indexOf('.txt') != -1 ||
		// 				e.name.indexOf('.md') != -1;
		// 		});

		// 	return this;
		// };

		var get_note_name = function(file_name) {
			if (!file_name) throw new 'get_note_name : file_name is null';

			var path_end = file_name.lastIndexOf('/');
			if (path_end != -1) {
				file_name = file_name.substr(path_end + 1);
			}

			var ext_begin = file_name.lastIndexOf('.');
			if (ext_begin != -1) {
				file_name = file_name.substr(0, ext_begin);
			}

			return file_name;
		};

		// Expects first argument of 'notes_model'
		// 'out' must be a valid HTTP list element(ul or ol) that can contain 'li' elements.
		// 'click_event' must be provided to support interaction. each entry of 'note_model.entries' will be passed
		this.format_notes_model = function(nm, out, click_event) {
			if (!nm) throw this.name + 'format_notes_model : nm is null';

			nm.entries.forEach(function(entry) {
				var $tag = $('<li class=\"menuItem\">' +
					'<a>' +
					get_note_name(entry.name) +
					'</a>' +
					'</li>').appendTo(out);

				// handles click event
				$tag.on("click", function() {
					if (click_event) click_event(entry);
				});
			});
		}

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
		this.download = path => dbx.filesDownload({path: path});

		this.upload = function(path, content){
			return dbx.filesUpload({
				path: path,
				contents: content,
				mode: 'overwrite'
			});
		};

		this.push_note_content = function(path, content) {
			return new Promise(function(resolve, reject) {
				dbx.filesUpload({
						path: path,
						contents: content,
						mode: 'overwrite'
							// Name	            Type            Description
							// contents	        Object          The file contents to be uploaded.
							// path	            string          Path in the user's Dropbox to save the file.
							// mode	            FilesWriteMode  Selects what to do if the file already exists.
							// autorename	      boolean		      If there's a conflict, as determined by mode, have the Dropbox server try to autorename the file to avoid conflict.
							// client_modified  Timestamp	      The value to store as the client_modified timestamp. Dropbox automatically records the time at which the file was written to the Dropbox servers. It can also record an additional timestamp, provided by Dropbox desktop clients, mobile clients, and API apps of when the file was actually created or modified.
							// mute             boolean         Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If true, this tells the clients that this modification shouldn't result in a user notification.
					})
					.then(function(data) {
						if (resolve)
							resolve(data);
					})
					.catch(function(e) {
						if (reject)
							reject(e);
					});
			});
		};

		this.push_delete = function(path) {
			return dbx.filesDelete({
				path: path
			});
		};
		
		this.listFolder = path => dbx.filesListFolder({path:path});
		
		this.getDirectLink = path => dbx.filesGetTemporaryLink({path});
	};
})(window);