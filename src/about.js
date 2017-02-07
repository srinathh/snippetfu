import React from 'react';
import MenuItemDialog from './menuitemdialog'

class AboutDialog extends React.Component {
    render() {
        let content = (
            <div>
                <p> Snippet-Fu, Copyright (C) 2017, Hariharan Srinath</p>
                <p> Source Code: https://github.com/srinathh/snippetfu</p>
                <p> This program is free software; you can redistribute it and/or
                    modify it under the terms of the GNU General Public License
                    as published by the Free Software Foundation; either version 2
                    of the License, or (at your option) any later version.</p>
                <p> This program is distributed in the hope that it will be useful,
                    but WITHOUT ANY WARRANTY; without even the implied warranty of
                    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
                    GNU General Public License for more details.</p>
                <p> You should have received a copy of the GNU General Public License
                    along with this program; if not, write to the Free Software
                    Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.</p>
            </div>
        )
        return (
            <MenuItemDialog menuItem="About" dialogContent={content} />
        );
  }
}

export default AboutDialog;