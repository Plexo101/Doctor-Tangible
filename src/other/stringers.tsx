import React, { ReactPropTypes } from 'react'
import { render } from 'react-dom'

export function schoolStringify(school: string) {
  switch (school) {
    case 'A':
      return "Abjuration"
      break;
    case 'C':
      return "Conjuration"
      break;
    case 'D':
      return "Divination"
      break;
    case 'E':
      return "Enchantment"
      break;
    case 'V':
      return "Evocation"
      break;
    case 'I':
      return "Illution"
      break;
    case 'T':
      return "Transmutation"
      break;
    case 'N':
      return "Necromancy"
      break;

    default:
      return "Owo"
      break;
  }
}

export function entryToReact() {

}