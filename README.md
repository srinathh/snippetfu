Snippet-Fu
==========
Snippet-Fu lets you store frequently used snippets of text and
copy them to the clipboard by simply clicking the tex. It 
simplifies working with repeatedly used sentences or command
lines. All your data is stored offline in your own computer
and absolutely nothing is tracked or communicated over the
network. 

Unlike text editors, Snippet-Fu doesn't require you to first
select the text before copying which reduces chances of
over-writing and errors. Unlike clipboard manager apps,
Snippet-Fu keeps only what you explicitly put into it and
doesn't monitor your clipboard.

By default, the snippets are stored as a plain JSON file in
your local data folder as `snippet-fu.json` and has simple options
to export your data. Do not save passwords or other similar 
sensitive information in Snippet-Fu.

Development Flow
----------------
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
