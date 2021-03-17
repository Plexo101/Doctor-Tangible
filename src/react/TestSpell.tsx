import React, { ReactPropTypes } from 'react'
import { render } from 'react-dom'
import * as data from '../../data/spells/spells-phb.json'

interface Props {
    name: string;
}

function TestSpell(props: Props) {
    return (
        <div className="test-spell">
            <h3>{data.spell[22].name}</h3>
            <p>{data.spell[22].source}</p>
        </div>
    );
}

export default TestSpell