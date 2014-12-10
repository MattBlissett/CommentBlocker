var guardian = require('./guardian').Guardian;
var pageMod = require('sdk/page-mod').PageMod;
var url = require('sdk/self').data.url;
var button = require('./ui').Button;

// Whenever the user clicks the icon, toggle comment visibility
button.addCallback(function() {
	guardian.toggleComments(button.refresh);
});

// Attach our content script to all documents upon their creation
pageMod({
	include: '*',
	contentScriptFile: url('worker.js'),
	contentScriptWhen: 'start',
	contentStyleFile: url('worker.css'),
	onAttach: function(worker) {
		new guardian(worker, button.refresh);
	}
});