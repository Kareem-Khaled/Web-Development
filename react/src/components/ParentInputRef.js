import React, { Component } from 'react'
import InputRef from './InputRef'

export default class ParentInputRef extends Component {
    constructor(props) {
        super(props)
        this.InputRef = React.createRef();
    }
    clickHandler = () =>{
        this.InputRef.current.focus();
    }
  render() {
    return (
        <>
            <InputRef ref = {this.InputRef}/>
            <button onClick={this.clickHandler}>focus input</button>
        </>
    )
  }
}
