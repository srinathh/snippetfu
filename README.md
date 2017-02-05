Snippet-Fu
==========
Snippet-Fu lets you store and copy frequently used snippets
of text quickly. All data is stored offline in your own computer
and absolutely nothing is tracked or communicated over the
network. 

Unlike storing in text files or notes, Snippet-Fu will copy
the text to clipboard with one click and doesn't require you
to select it first removing chances of over-typing and errors. 
Unlike clipboard managers, it will only keep what you explicitly
put into it and won't monitor your clipboard.

The snippets are stored as a plain JSON file in your local
data folder and the program has simple options to export your
data. Do not save passwords in Snippet-Fu.

Snippet-Fu was originally released as a [Chrome app](https://chrome.google.com/webstore/detail/snippet-fu/goekbdcfildilcmmlodpfemnjlkjajco?hl=en)
but with [sun-setting](https://blog.chromium.org/2016/08/from-chrome-apps-to-web.html)
of the Chrome Apps platform for Windows and Linux, it is released
as a stand-alone app based on [Electron](http://electron.atom.io/).

Building and Running
--------------------
This project is based on [Electron](http://electron.atom.io/)
and built using [React](https://facebook.github.io/react/)
components. It uses [Create React App](https://github.com/facebookincubator/create-react-app)
to bootstrap the react components. The workflow for building
the app and development is mentioned below.

- Make sure Electron is installed in your system
  ```
  npm install -g electron
  ```
- Clone the repository into a suitable location on the drive
  ```
  git clone https://github.com/srinathh/snippetfu.git
  ```
- Install all the development components and libraries through
  ```
  cd snippetfu
  npm install 
  ```
- Build the project using react-scripts
  ```
  npm run build
  ```
- Run electron on the build directory
  ```
  electron build
  ```
Development Notes 
------------------
- For development, should uncomment this line in `main.js` to show dev tools
  ```
  // win.webContents.openDevTools()
  ```
- In a number of places, you may see `window.require()`. This is to prevent 
  conflict between NodeJS `require()` that is used by webpack in create-react-app 
  and `require()` supported by Electron at runtime.

License
-------
Snippet-Fu, Copyright (C) 2017, Hariharan Srinath

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
