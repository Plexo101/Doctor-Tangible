import React, { JSXElementConstructor, ReactPropTypes } from 'react'
import { render } from 'react-dom'
import * as data from '../../data/spells/spells-xge.json'
import * as stringers from '../other/stringers'

interface Props {
    index: number;
    max: number;
}

interface Time {
    number: number;
    unit: string;
}

function TestSpell(props: Props) {
    let number = props.index;
    if (number >= props.max){
        number = props.max-1
    } else if (number < 0) {
        number = 0
    }

    /* Spell level */
    let school = stringers.schoolStringify(data.spell[number].school)
    let spell = "Lv." + data.spell[number].level + " " + school.toLowerCase() + " spell."
    if (data.spell[number].level == 0){
        spell = school + " cantrip."
    }

    /* Casting time */
    let time = "";
    for (let i = 0; i < data.spell[number].time.length; i++) {
        if (i == 0){
            time = data.spell[number].time[i].number.toString() + " " + data.spell[number].time[i].unit.toString() + " "
        } else {
            time += "or " + data.spell[number].time[i].number.toString() + " " + data.spell[number].time[i].unit.toString() + " "
        }
    }

    /* Components */
    let components = ""
    let first = 0
    if (data.spell[number].components.v){
        if (first > 0) {
            components += ", "
        }
        components += "S"
        first += 1;
    }
        
    if (data.spell[number].components.s){
        if (first > 0) {
            components += ", "
        }
        components += "V"
        first += 1;
    }

    if (data.spell[number].components.m != null){
        if (first > 0) {
            components += ", "
        }
        components += "M"
        components += " (" + data.spell[number].components.m +")"
        first += 1;
    }

    /* Duration */
    let duration = ""
    /*
    for (let i = 0; i < data.spell[number].duration.length; i++) {
        if (i == 0){
            console.log(data.spell[number].duration[i])
            if (data.spell[number].duration[i].type = "instant"){
                duration += "Instantaneous"
            } else if (data.spell[number].duration[i].type = "timed") {
                console.log(data.spell[number].duration[i])
                //data.spell[number].duration[i].
            }
        } else {

        }
    }
    */

    let description = ""
    let higherLevel = ""
    for (let index = 0; index < data.spell[number].entries.length; index++) {
        description += data.spell[number].entries[index] + "\n"
    }
    for (let index = 0; index < data.spell[number].entriesHigherLevel![0].entries.length; index++) {
        higherLevel += data.spell[number].entriesHigherLevel![0].entries[index]
    }
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
    
    


    return (
        <table id="test-spell">
            <th id="name">{data.spell[number].name}</th>
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
            

            <tr id="source">Casting Time: {data.spell[number].time[0]}</tr>

            <p id="source">Range {data.spell[number].range}</p>

            <p id="source">Components: {data.spell[number].components}</p>

            <p id="source">Duration: {data.spell[number].duration[0]}</p>

            <p style={{marginTop: "10px"}}>{data.spell[number].entries[0]}</p>
            */

export default TestSpell