/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '_public/style.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TestSpell from '../react/TestSpell'
import App from '../react/App'
import Header from '../react/Header'

/* Load the Header HTML with React*/
ReactDOM.render(
  <Header />,
  document.getElementById('header'),
);

ReactDOM.render(
  <TestSpell name="foo"/>,
  document.getElementById("main"),
);

/* Window button functionality (minmize, maximize, restore and close buttons)*/
import { remote } from 'electron';
import { Test } from 'mocha';
const win = remote.getCurrentWindow();

  // When document has loaded, initialise
document.onreadystatechange = (event) => {
  if (document.readyState == "complete") {
      handleWindowControls();
  }
};

window.onbeforeunload = (event: any) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
  win.removeAllListeners();
}
function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
  document.getElementById('min-button')!.addEventListener("click", event => {
      win.minimize();
  });

  document.getElementById('max-button')!.addEventListener("click", event => {
      win.maximize();
  });

  document.getElementById('restore-button')!.addEventListener("click", event => {
      win.unmaximize();
  });

  document.getElementById('close-button')!.addEventListener("click", event => {
      win.close();
  });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
  toggleMaxRestoreButtons();
  win.on('maximize', toggleMaxRestoreButtons);
  win.on('unmaximize', toggleMaxRestoreButtons);

  function toggleMaxRestoreButtons() {
      if (win.isMaximized()) {
          document.body.classList.add('maximized');
      } else {
          document.body.classList.remove('maximized');
      }
  }

  /**/
}