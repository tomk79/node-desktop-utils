var assert = require('assert');
// var path = require('path');
var fs = require('fs');
var desktopUtils = require('../libs/main.js');

describe('Interfaces', function() {

	it('check interfaces', function(done) {
		assert.equal(typeof(desktopUtils), typeof({}));
		assert.equal(typeof(desktopUtils.open), typeof(function(){}));
		done();
	});

});

describe('open()', function() {

	it('Open directory', function(done) {
		var spawn = desktopUtils.open('./');
		assert.equal(typeof(spawn), typeof({}));
		// spawn.kill('SIGTERM');
		setTimeout(function(){
			done();
		}, 1900);
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
