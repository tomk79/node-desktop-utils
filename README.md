# node-desktop-utils

## Installation

```bash
$ npm install desktop-utils
```

## Usage

```js
var desktopUtils = require('desktop-utils');

// Open directory.
desktopUtils.open('./path/to/directory/');

// Open file with default application.
desktopUtils.open('./path/to/file.txt');

// Open URL
desktopUtils.open('http://www.pxt.jp/');

// Get local data directory
var dir = desktopUtils.getLocalDataDir('appname');
console.log( dir );
    // This returns
    //   - "/Users/{$UserName}/.appname" on darwin(=MacOSX)
    //   - "C:\\Users\\{$UserName}\\.appname" on win32(=Windows)
```


