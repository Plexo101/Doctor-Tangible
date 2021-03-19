import React, { JSXElementConstructor, ReactPropTypes } from 'react'
import { render } from 'react-dom'
import * as data from '../../data/spells/spells-xge.json'
import * as stringers from '../other/stringers'

interface Serializable<T> {
    deserialize(input: Object): T;
}

interface Props {
    index: number;
    max: number;
}

interface SpellSource {
    source: string,
    page: number
}

interface SpellTime{
    number: number,
    unit: string,
    condition: string
}

interface SpellRange {
    type: string,
    distance : SpellRangeDistance
}

interface SpellRangeDistance {
    type: string,
    amount: number
}

interface SpellComponents {
    v: boolean,
    s: boolean,
    m: SpellComponentsMaterials | string
}

interface SpellComponentsMaterials {
    text: string,
    cost: number,
    consume: boolean
}

interface SpellDuration {
    type: string,
    duration: SpellDurationDuration
    ends: string[],
    concentration: boolean
}

interface SpellDurationDuration {
    type: string,
    amount: number
}

interface SpellEntries {
    type: string,
    name: string,
    entries: string[]
}

interface SpellScalingLevelDice {  //Only for cantrips
    lavel: string,
    scaling: SpellScalingLevelDiceScaling
}

interface SpellScalingLevelDiceScaling {
    1: string,
    5: string,
    11: string,
    17: string
}

interface SpellClassesGroup {
    fromClassList: SpellClasses[],
    fromClassListVariant: SpellClasses[],
    backgrounds: SpellClasses[]
}

interface SpellClasses {
    name: string,
    source: string,
    definedInSource: string
}

interface Spell {
    name: string;
    source: SpellSource;
    otherSources: SpellSource[];
    level: number;
    school: string;
    time: SpellTime[];
    range: SpellRange;
    components: SpellComponents;
    duration: SpellDuration[];
    entries:  string &  SpellEntries[];
    entriesHigherLevel: SpellEntries[];
    damageInflict: string[];
    savingThrow: string[];
    miscTags: string[];
    areaTags: string[];
    classes: SpellClassesGroup;
}

function TestSpell(props: Props) {

    //Clamp the index from 0 to the max (length)
    let number = props.index;
    if (number >= props.max){
        number = props.max-1
    } else if (number < 0) {
        number = 0
    }

    console.log("Clamp completed")

    let currentSpell : Spell = JSON.parse(JSON.stringify(data.spell[number]))

    /* Spell level */
    let school = stringers.schoolStringify(currentSpell.school)
    let spell = "Lv." + currentSpell.level + " " + school.toLowerCase() + " spell."
    if (currentSpell.level == 0){
        spell = school + " cantrip."
    }

    console.log("Spell type completed")

    /* Casting time */
    let time = "";
    for (let i = 0; i < currentSpell.time.length; i++) {
        if (i == 0){
            time = currentSpell.time[i].number.toString() + " " + currentSpell.time[i].unit.toString() + " "
        } else {
            time += "or " + currentSpell.time[i].number.toString() + " " + currentSpell.time[i].unit.toString() + " "
        }
    }

    console.log("Spell time completed")

    /* Components */
    let components = ""
    let first = 0
    if (currentSpell.components.v){
        if (first > 0) {
            components += ", "
        }
        components += "S"
        first += 1;
    }
        
    if (currentSpell.components.s){
        if (first > 0) {
            components += ", "
        }
        components += "V"
        first += 1;
    }

    if (currentSpell.components.m != null){
        if (first > 0) {
            components += ", "
        }
        components += "M"
        if (typeof(currentSpell.components.m) == 'string')
            components += " (" + currentSpell.components.m +")"
        else {
            components += " (" + currentSpell.components.m.text + ")"
            if (currentSpell.components.m.consume)
                components += " [Consume]"
        }
        first += 1;
    }

    console.log("Spell components completed")

    /* Duration */
    let duration = ""
    for (let i = 0; i < currentSpell.duration.length; i++) {
        if (i == 0){
            console.log(currentSpell.duration[i])
            if (currentSpell.duration[i].type = "instant"){
                duration += "Instantaneous"
            } else if (currentSpell.duration[i].type = "timed") {
                console.log(currentSpell.duration[i])
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

    console.log("Spell duration completed")

    let description = ""
    let higherLevel = ""

    if (currentSpell.entries != null)
    for (let index = 0; index < currentSpell.entries.length; index++) {
        if (index > 0 && currentSpell.entries[index].entries != null) {
            description += "\n - " + currentSpell.entries[index].name + ": "+ currentSpell.entries[index].entries
        } else {
            description += currentSpell.entries[index]
        }
    }

    if (currentSpell.entriesHigherLevel != null)
    for (let index = 0; index < currentSpell.entriesHigherLevel![0].entries.length; index++) {
        higherLevel += currentSpell.entriesHigherLevel![0].entries[index]
    }

    console.log("Search for damages")
    //Search for any type of damage   eg:  {@damage 1d6} or {@damage 2d8}

    function retreiveDamageFromString(string : string, startIntex : number) {
        let returned : string[] = []
        let exit = false
        
        let index = 0
        let buildingString = ""
        let building = false;
        while (!exit) {
            if (string.charAt(index) == '{'){
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
    
    let damagesRAW : string[] = retreiveDamageFromString(description, 0)
    let damages : string[] = []

    //Normalize the damage output  ->  @damage 1d6  :   1d6
    for (let index = 0; index < damagesRAW.length; index++) {
        damages[index] = damagesRAW[index].split(' ')[1];
    }

    for (let index = 0; index < damagesRAW.length; index++) {
        description = description.replaceAll("{"+damagesRAW[index]+"}", damages[index])
    }

    let damagesRAWHigherLevel : string[] = retreiveDamageFromString(higherLevel, 0)
    let damagesHigherLevel : string[] = []

    //Normalize the damage output  ->  @damage 1d6  :   1d6
    for (let index = 0; index < damagesRAWHigherLevel.length; index++) {
        damagesHigherLevel[index] = damagesRAWHigherLevel[index].split(' ')[1];
    }

    for (let index = 0; index < damagesRAWHigherLevel.length; index++) {
        higherLevel = higherLevel.replaceAll("{"+damagesRAWHigherLevel[index]+"}", damagesHigherLevel[index])
    }
    
    console.log("Spell description completed")


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