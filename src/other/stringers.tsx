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

export function schoolStringifyColorsPure(school: string) {
  switch (school) {
    case 'A':
      return "#ffffff"
      break;
    case 'C':
      return "#4559c9"
      break;
    case 'D':
      return "#a546ca"
      break;
    case 'E':
      return "#54c945"
      break;
    case 'V':
      return "#c94545"
      break;
    case 'I':
      return "#c98045"
      break;
    case 'T':
      return "#e0dd30"
      break;
    case 'N':
      return "#000000"
      break;

    default:
      return "#ffffff"
      break;
  }
}