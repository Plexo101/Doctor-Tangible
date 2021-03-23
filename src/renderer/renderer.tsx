/**
 * React renderer.
 */
// Import the styles here to process them with webpack
import '_public/style.css';

import path from 'path'
var mkdirp = require('mkdirp')

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import TestSpell from '../react/TestSpell'
import CharacterEditor from '../react/CharacterEditor'
import Header from '../react/Header'

import * as data from '../../data/spells/spells-phb.json'

import * as jsonInterfaces from '../react/json-interfaces'
import defaultCharacter from '../../public/defaultCharacter.json'
import * as fs from 'fs'
import '../react/json-interfaces'

const characterFileExtension = ".extensiontowapa"

const appPath = path.join(__dirname, '../')
const dataPath = appPath + '/user/'
//If the user folder does not exist, then create it
try {
  fs.accessSync(dataPath, constants.F_OK)

} catch (err) {
  mkdirp(dataPath)
}

/* Load the Header HTML with React*/
ReactDOM.render(
  <Header />,
  document.getElementById('header'),
);

/* Load the Header HTML with React*/
ReactDOM.render(
  <CharacterEditor />,
  document.getElementById('app'),
);

/* Window button functionality (minmize, maximize, restore and close buttons)*/
import { remote } from 'electron';
import { Test } from 'mocha';
import { constants } from 'original-fs';
const win = remote.getCurrentWindow();

// When document has loaded, initialise
document.onreadystatechange = (event) => {
  if (document.readyState == "complete") {
    handleWindowControls();
    handleCharacterButtons();
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
  document.getElementById('min-button')?.addEventListener("click", event => {
    win.minimize();
  });

  document.getElementById('max-button')?.addEventListener("click", event => {
    win.maximize();
  });

  document.getElementById('restore-button')?.addEventListener("click", event => {
    win.unmaximize();
  });

  document.getElementById('close-button')?.addEventListener("click", event => {
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

//Save character, load character and delete character
function handleCharacterButtons() {

  document.getElementById('save-character')?.addEventListener("click", event => {
    SaveCharacter()
  })

  document.getElementById('load-character')?.addEventListener("click", event => {

  })

  document.getElementById('delete-character')?.addEventListener("click", event => {

  })
}

function SaveCharacter() {
  let charNameReal = (document.getElementById("character-name") as HTMLInputElement)?.value
  let charName = stringifyCharacterName(charNameReal)
  if (charName != null || undefined || "") {

    let createdNew = false
    var characterData: jsonInterfaces.Character

    //If the file doesn't exist, create one
    try {

      //Character file exists
      fs.accessSync(dataPath + charName + characterFileExtension, constants.F_OK)
      console.log("file exists")

    } catch (err) {

      createdNew = true
      //Character file doesnt exist, so we create one
      characterData = defaultCharacter
      fs.writeFileSync(dataPath + charName + characterFileExtension, JSON.stringify(characterData, null, 2))

    }

    //Overwrite the file with the new data
    let characterDataRAW = JSON.parse(fs.readFileSync(dataPath + charName + characterFileExtension, 'utf8'))
    characterData = JSON.parse(JSON.stringify(characterDataRAW))
    //Name
    characterData.name = charNameReal

    //Write it in the new file
    fs.writeFileSync(dataPath + charName + characterFileExtension, JSON.stringify(characterData, null, 2))

  }
  else {
    console.error("Character name invalid");
  }

  function stringifyCharacterName(name: string) {
    name = name.trim()
    name = name.toLowerCase()
    name = name.replaceAll(" ", "-")
    return name
  }
}