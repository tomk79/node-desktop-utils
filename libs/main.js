/**
 * desktop-utils
 */
module.exports = new (function(){
	var supported = false;
	var dirSeparator = '/';
	switch( process.platform ){
		case 'darwin':
			dirSeparator = '/';
			supported = true;
			break;
		case 'win32':
			dirSeparator = '\\';
			supported = true;
			break;
		default:
			supported = false;
			break;
	}


	/**
	 * アイテムを開く
	 * @param string item 開くアイテムの URL や ファイル、ディレクトリのパス。
	 * MacOSXの場合は `open` へ、Windowsの場合は `explorer` へ渡されます。
	 * @return spawn
	 */
	this.open = function( item ){
		if( !supported ){ return false; }
		var spawn = require('child_process').spawn;
		var fs = require('fs');
		var cmd = 'open';
		if(process.platform == 'win32'){
			cmd = 'explorer';
			if( item.match(new RegExp('^(?:https?|data)\\:','i')) ){
				// OS依存しないのでスルー
			}else if( fs.existsSync(item) ){
				item = fs.realpathSync(item);
			}else{
				item = require('path').resolve(item);
			}
		}
		return spawn( cmd, [item], {} );
	}

	/**
	 * ローカルデータディレクトリのパスを取得する
	 */
	this.getLocalDataDir = function( appName ){
		if( !supported ){ return false; }
		if( !(process.env.HOME||process.env.LOCALAPPDATA) ){ return false; }
		var path = require('path');
		if(typeof(appName)==typeof(0)||typeof(appName)==typeof(1.5)){appName = ''+appName;}
		if(typeof(appName)!=typeof('')){return false;}

		appName = appName.replace(new RegExp('[^a-zA-Z0-9\\_\\-]+','g'), '');
		// appName = appName.toLowerCase();

		if(!appName.length){return false;}

		var path_data_dir = (process.env.HOME||process.env.LOCALAPPDATA) + '/.'+appName+'/';
		path_data_dir = path.resolve(path_data_dir);
		return path_data_dir;
	}

	/**
	 * サーバがUNIXパスか調べる。
	 *
	 * @return bool UNIXパスなら `true`、それ以外なら `false` を返します。
	 */
	this.isUnix = function(){
		if( dirSeparator == '/' ){
			return true;
		}
		return false;
	}//isUnix()

	/**
	 * サーバがWindowsパスか調べる。
	 *
	 * @return bool Windowsパスなら `true`、それ以外なら `false` を返します。
	 */
	this.isWindows = function(){
		if( dirSeparator == '\\' ){
			return true;
		}
		return false;
	}//isWindows()

})();
