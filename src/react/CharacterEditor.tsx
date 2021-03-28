import React, { ReactPropTypes } from 'react'
import { render } from 'react-dom'
import * as jsonInterfaces from './json-interfaces'

type Props = {
    character: jsonInterfaces.Character
}

class CharacterEditor extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <div id="character-data">
                <p id="name">{this.props.character.name}</p>
                <p id="class">{this.props.character.class}</p>
                <p id="subclass">{this.props.character.subclass}</p>
                <p id="classLevel">{this.props.character.classLevel}</p>
            </div>
        );
    }
}

export default CharacterEditor