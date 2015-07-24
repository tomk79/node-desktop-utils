# node-desktop-utils

## Installation

```bash
$ npm install desktop-utils --save
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

// is Unix path
var isUnix = desktopUtils.isUnix();
console.log( isUnix );
    // This returns
    //   - true on darwin(=MacOSX)
    //   - false on win32(=Windows)

// is Windows path
var isWindows = desktopUtils.isWindows();
console.log( isWindows );
    // This returns
    //   - false on darwin(=MacOSX)
    //   - true on win32(=Windows)
```
