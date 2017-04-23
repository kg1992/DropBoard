// uses express framework
var express = require('express');
// // usese path package
// var path = require('path');
// // uses utf8 package
// var utf8 = require('utf8');
// // uses markdown parser : https://github.com/evilstreak/markdown-js
// var markdown = require('markdown').markdown;
// // uses dropbox api v2 : https://www.dropbox.com/developers
// var Dropbox = require('dropbox');
//// support http request body parsing : http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
//var bodyParser = require('body-parser');
// // http://stackoverflow.com/questions/2496710/writing-files-in-node-js
// var fs = require('fs');

// // Gain access to the specific dropbox account and application by pre-generated access token.
// var dbx = new Dropbox({
//   accessToken: 'gKwp...'
// });

// Start framework
var app = express();

// Serves static resources. used for client.
app.use(express.static('client'));
// app.use(express.bodyParser());

// // http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// })); 
// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies

// Serves main page
app.get('/', function(req, res) {
  var client_path = path.join(path.join(__dirname, 'client'), 'index.html');
  res.sendfile(client_path);
});

// // Serves file content.
// //
// // example input from client:
// //
// //         build request url
// //         var req_url = service_url + "/ajax/content/notes/" + file_name;
// //         // // debug output 'req_url'
// //         // console.log(req_url);
// //         $.get(req_url, function(res) {
// //             $('#note_name').text(file_name);
// //             $('#content_view').val(res);
// //             current_file = file_name;
// //         });
// //
// app.get('/ajax/content/*', function(req, res) {
//   // // debug log
//   // console.log(req.originalUrl);
//   // requested path to the file
//   var req_path = req.originalUrl;
//   // cut domain from url
//   req_path = req_path.substr(req_path.indexOf('/', '/ajax/content'.length));
//   // cut parameters from url
//   var url_param_begin = req_path.indexOf('?');
//   if (url_param_begin != -1)
//     req_path = req_path.substr(0, url_param_begin);

//   // Start downloading from dropbox
//   // ref : http://dropbox.github.io/dropbox-sdk-js/Dropbox.html#filesDownload__anchor
//   dbx.filesDownload({
//       path: req_path
//     })
//     .then(function(data) {
//       // // debug output
//       // console.log(data);
//       // decode file
//       var s = utf8.decode(data.fileBinary);
//       // send
//       res.send(s);
//     })
//     .catch(function(e) {
//       console.log(e);
//     });
// });

// // Upload file
// app.post('/ajax/up/*', function(req, res) {
//   // // debug log
//   // console.log(req.originalUrl);
//   // requested path to the file
//   var req_path = req.originalUrl;
//   // cut domain from url
//   req_path = req_path.substr(req_path.indexOf('/', '/ajax/up'.length));
//   // cut parameters from url
//   var url_param_begin = req_path.indexOf('?');
//   if (url_param_begin != -1)
//     req_path = req_path.substr(0, url_param_begin);

//   console.log("uploading to \'" + req_path + "\'... ");

//   dbx.filesUpload({
//     path : req_path,
//     contents : req.body.content,
//     mode : 'overwrite'
//     // Name	Type	Argument	Description
//     // contents	Object		The file contents to be uploaded.
//     // path	string		Path in the user's Dropbox to save the file.
//     // mode	FilesWriteMode		Selects what to do if the file already exists.
//     // autorename	boolean		If there's a conflict, as determined by mode, have the Dropbox server try to autorename the file to avoid conflict.
//     // client_modified	Timestamp	<optional>
//     // The value to store as the client_modified timestamp. Dropbox automatically records the time at which the file was written to the Dropbox servers. It can also record an additional timestamp, provided by Dropbox desktop clients, mobile clients, and API apps of when the file was actually created or modified.
//     // mute	boolean		Normally, users are made aware of any file modifications in their Dropbox account via notifications in the client software. If true, this tells the clients that this modification shouldn't result in a user notification.
//   })
//   .then( function(data){
//     console.log('upload successful');
//   })
//   .catch( function(e){
//     console.log('upload failed');
//   });
// });

// start hosting server 
try {
  var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at %s:%s", host, port);
    //console.log(path.join(path.join(__dirname, 'client'), 'index.html'));
  });
}
catch (e) {
  console.log("Serveer Launching Failed. reason:");
  console.log(e);
}
