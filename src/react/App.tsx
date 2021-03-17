import React, { ReactPropTypes } from 'react'
import { render } from 'react-dom'

interface Props {
    name: string;
}

function App(props: Props) {
    return (
        <div className="app">
            <h4>{props.name}</h4>
            <p>Hello</p>
        </div>
    );
}

export default App