import React, { JSXElementConstructor, ReactPropTypes } from 'react'
import { render } from 'react-dom'
import * as data from '../../data/spells/spells-xge.json'
import * as stringers from '../other/stringers'

import * as jsonInterfaces from '../react/json-interfaces'

interface SpellProps {
    index: number;
    max: number;
}

function TestSpell(props: SpellProps) {

    //Clamp the index from 0 to the max (length)
    let number = props.index;
    if (number >= props.max) {
        number = props.max - 1
    } else if (number < 0) {
        number = 0
    }

    let currentSpell: jsonInterfaces.Spell = JSON.parse(JSON.stringify(data.spell[number]))

    /* Spell level */
    let school = stringers.schoolStringify(currentSpell.school)
    let spell = "Lv." + currentSpell.level + " " + school.toLowerCase() + " spell."
    if (currentSpell.level == 0) {
        spell = school + " cantrip."
    }

    /* Casting time */
    let time = "";
    for (let i = 0; i < currentSpell.time.length; i++) {
        if (i == 0) {
            time = currentSpell.time[i].number.toString() + " " + currentSpell.time[i].unit.toString() + " "
        } else {
            time += "or " + currentSpell.time[i].number.toString() + " " + currentSpell.time[i].unit.toString() + " "
        }
    }


    /* Components */
    let components = ""
    let first = 0
    if (currentSpell.components.v) {
        if (first > 0) {
            components += ", "
        }
        components += "S"
        first += 1;
    }

    if (currentSpell.components.s) {
        if (first > 0) {
            components += ", "
        }
        components += "V"
        first += 1;
    }

    if (currentSpell.components.m != null) {
        if (first > 0) {
            components += ", "
        }
        components += "M"
        if (typeof (currentSpell.components.m) == 'string')
            components += " (" + currentSpell.components.m + ")"
        else {
            components += " (" + currentSpell.components.m.text + ")"
            if (currentSpell.components.m.consume)
                components += " [Consume]"
        }
        first += 1;
    }


    /* Duration */
    let duration = ""
    for (let i = 0; i < currentSpell.duration.length; i++) {
        if (i == 0) {
            if (currentSpell.duration[i].type = "instant") {
                duration += "Instantaneous"
            } else if (currentSpell.duration[i].type = "timed") {
                for (let index = 0; index < currentSpell.duration.length; index++) {
                    if (index != 0) {
                        duration += " or " + currentSpell.duration[index].duration.amount
                        if (currentSpell.duration[index].duration.amount > 1)
                            duration += " " + currentSpell.duration[index].duration.type + "s"
                        else
                            duration += " " + currentSpell.duration[index].duration.type

                        if (currentSpell.duration[index].concentration)
                            duration += " [C]"
                    } else {
                        duration += currentSpell.duration[index].duration.amount
                        if (currentSpell.duration[index].duration.amount > 1)
                            duration += " " + currentSpell.duration[index].duration.type + "s"
                        else
                            duration += " " + currentSpell.duration[index].duration.type

                        if (currentSpell.duration[index].concentration)
                            duration += " [C]"
                    }
                }
            }
        } else {

        }
    }


    let description = ""
    let higherLevel = ""

    if (currentSpell.entries != null)
        for (let index = 0; index < currentSpell.entries.length; index++) {
            if (index > 0 && currentSpell.entries[index].entries != null) {
                description += "\n - " + currentSpell.entries[index].name + ": " + currentSpell.entries[index].entries
            } else {
                description += currentSpell.entries[index]
            }
        }

    if (currentSpell.entriesHigherLevel != null)
        for (let index = 0; index < currentSpell.entriesHigherLevel![0].entries.length; index++) {
            higherLevel += currentSpell.entriesHigherLevel![0].entries[index]
        }

    //Search for any type of damage   eg:  {@damage 1d6} or {@damage 2d8}

    function retreiveDamageFromString(string: string, startIntex: number) {
        let returned: string[] = []
        let exit = false

        let index = 0
        let buildingString = ""
        let building = false;
        while (!exit) {
            if (string.charAt(index) == '{') {
                building = true
            }
            else if (string.charAt(index) == '}') {
                returned.push(buildingString)
                buildingString = ""
                building = false
            } else if (building) {
                buildingString += string.charAt(index)
            }

            if (index < string.length)
                index += 1
            else break
        }

        return returned;
    }

    let damagesRAW: string[] = retreiveDamageFromString(description, 0)
    let damages: string[] = []

    //Normalize the damage output  ->  @damage 1d6  :   1d6
    for (let index = 0; index < damagesRAW.length; index++) {
        damages[index] = damagesRAW[index].split(' ')[1];
    }

    for (let index = 0; index < damagesRAW.length; index++) {
        description = description.replaceAll("{" + damagesRAW[index] + "}", damages[index])
    }

    let damagesRAWHigherLevel: string[] = retreiveDamageFromString(higherLevel, 0)
    let damagesHigherLevel: string[] = []

    //Normalize the damage output  ->  @damage 1d6  :   1d6
    for (let index = 0; index < damagesRAWHigherLevel.length; index++) {
        damagesHigherLevel[index] = damagesRAWHigherLevel[index].split(' ')[1];
    }

    for (let index = 0; index < damagesRAWHigherLevel.length; index++) {
        higherLevel = higherLevel.replaceAll("{" + damagesRAWHigherLevel[index] + "}", damagesHigherLevel[index])
    }


    return (
        <table id="test-spell">
            <th id="name">{currentSpell.name}</th>
            <tr>{spell}</tr>
            <tr>Casting time: {time}</tr>
            <tr>Components: {components}</tr>
            <tr>Duration: {duration}</tr>
            <tr id="desc">{description}</tr>
            <tr id="desc" >{higherLevel}</tr>

        </table>
    );
}

/*
            */

export default TestSpell