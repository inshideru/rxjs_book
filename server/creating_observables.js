const Rx = require('rx');
const fs = require('fs');

// Create an Observable from the readdir method
var readdir = Rx.Observable.fromNodeCallback(fs.readdir);

// Send a delayed message
var source = readdir(__dirname + '/Users/sergi');

var subscription = source.subscribe(
    function(res) { console.log( 'List of directories: ' + res);},
    function(err) { console.log( 'Error : ' + err);},
    function() { console.log( 'Done');}
)