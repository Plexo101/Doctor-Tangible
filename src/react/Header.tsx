import React, { ReactPropTypes } from 'react'
import { render } from 'react-dom'

function Header() {
    return (
        <header id="titlebar">
            <div id="drag-region">
                <div id="window-title">
                <span>BimbaBumba v0.1</span>
                </div>

                <div id="window-controls">

                    <div className="button" id="min-button">
                        <img className="icon" src="../assets/icons/min-w-20.png" draggable="false" />
                    </div>
                    <div className="button" id="max-button">
                        <img className="icon" src="../assets/icons/max-w-20.png" draggable="false" />
                    </div>
                    <div className="button" id="restore-button">
                        <img className="icon" src="../assets/icons/restore-w-20.png" draggable="false" />
                    </div>
                    <div className="button" id="close-button">
                        <img className="icon" src="../assets/icons/close-w-20.png" draggable="false" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header