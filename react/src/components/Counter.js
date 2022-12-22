import React, { Component } from 'react'

export default class Counter extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        number: 0
      }
    }
    
    add = () =>{
        this.setState((prev)=>({
            number: prev.number + 1
        }), () => {
          console.log(this.state.number)
        })  
    }
    reset = () =>{
      this.setState(() =>({
        number: 0
      }),
      () =>{
        console.log("Rest success")
      })
    }
    plus5 = () => {
        for (let index = 0; index < 5; index++) {          
            this.add();
        }
    }
    render() {
    return (
        <div>
            <h1>{this.state.number}</h1>
            <button onClick={() => this.add()}>++</button>
            <button onClick={() => this.reset()}>reset</button>
            <button onClick={() => this.plus5()}>+=5</button>
        </div>
    )
  }
}
