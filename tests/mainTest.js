var assert = require('assert');
// var path = require('path');
var fs = require('fs');
var desktopUtils = require('../libs/main.js');
var openAppTimer = 0;

describe('Interfaces', function() {

	it('check interfaces', function(done) {
		assert.equal(typeof(desktopUtils), typeof({}));
		assert.equal(typeof(desktopUtils.open), typeof(function(){}));
		done();
	});

});

describe('open(localDirectory)', function() {

	it('Open directory', function(done) {
		this.timeout(2*60*1000);
		var spawn = desktopUtils.open('./');
		assert.equal(typeof(spawn), typeof({}));
		setTimeout(function(){
			spawn.kill('SIGTERM');
			done();
		}, openAppTimer);
	});

});

describe('open(URL)', function() {

	it('Open URL', function(done) {
		this.timeout(2*60*1000);
		var spawn = desktopUtils.open('http://www.pxt.jp/');
		assert.equal(typeof(spawn), typeof({}));
		setTimeout(function(){
			spawn.kill('SIGTERM');
			done();
		}, openAppTimer);
	});

});

describe('openIn(App, URL)', function() {

	it('Open URL in Browser', function(done) {
		this.timeout(2*60*1000);
		var spawn = desktopUtils.openIn(
			'/Applications/Safari.app',
			'http://www.pxt.jp/'
		);
		assert.equal(typeof(spawn), typeof({}));
		setTimeout(function(){
			spawn.kill('SIGTERM');
			done();
		}, openAppTimer);
	});

});

describe('getLocalDataDir()', function() {
	var pathBase = (process.env.HOME||process.env.LOCALAPPDATA);
	var path = require('path');

	it('Get local data directory', function(done) {
		assert.equal(path.resolve(pathBase+'/.testName'), desktopUtils.getLocalDataDir('testName'));
		assert.equal(path.resolve(pathBase+'/.testName2'), desktopUtils.getLocalDataDir('test Name 2'));
		assert.equal(path.resolve(pathBase+'/.testName3'), desktopUtils.getLocalDataDir('test Name/3'));
		assert.equal(path.resolve(pathBase+'/.testName4'), desktopUtils.getLocalDataDir('te  s/. /.;/t Na...me/4'));
		assert.equal(path.resolve(pathBase+'/.test-name__5'), desktopUtils.getLocalDataDir('te  s/. /.;/t (-n)a...me/_ &_5'));
		assert.equal(false, desktopUtils.getLocalDataDir('    '));

		done();
	});

});

describe('isUnix(), isWindows()', function() {
	var pathBase = (process.env.HOME||process.env.LOCALAPPDATA);
	var path = require('path');

	var isUnix = false;
	var isWindows = false;
	switch( process.platform ){
		case 'darwin':
			isUnix = true;
			break;
		case 'win32':
			isWindows = true;
			break;
	}

	it('isUnix()', function(done) {
		assert.equal(isUnix, desktopUtils.isUnix());
		done();
	});

	it('isWindows()', function(done) {
		assert.equal(isWindows, desktopUtils.isWindows());
		done();
	});

});
