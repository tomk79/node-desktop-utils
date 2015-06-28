/**
 * desktop-utils
 */
module.exports = new (function(){

	/**
	 * アイテムを開く
	 * @param string item 開くアイテムの URL や ファイル、ディレクトリのパス。
	 * MacOSXの場合は `open` へ、Windowsの場合は `explorer` へ渡されます。
	 * @return spawn
	 */
	this.open = function( item ){
		var spawn = require('child_process').spawn;
		var cmd = 'open';
		if(process.platform=='win32'){
			cmd = 'explorer';
			if( item.match(new RegExp('^(?:https?|data)\\:','i')) ){
				// OS依存しないのでスルー
			}else if( _fs.existsSync(item) ){
				url = _fs.realpathSync(item);
			}
		}
		return spawn( cmd, [item], {} );
	}

	/**
	 * ローカルデータディレクトリのパスを取得する
	 */
	this.getLocalDataDir = function( appName ){
		var path = require('path');
		if(typeof(appName)==typeof(0)||typeof(appName)==typeof(1.5)){appName = ''+appName;}
		if(typeof(appName)!=typeof('')){return false;}

		appName = appName.replace(new RegExp('[^a-zA-Z0-9\\_\\-]+','g'), '');
		// appName = appName.toLowerCase();

		if(!appName.length){return false;}

		var path_data_dir = '/./'+(process.env.HOME||process.env.LOCALAPPDATA) + '/.'+appName+'/';
		path_data_dir = path.resolve(path_data_dir);
		return path_data_dir;
	}

})();
