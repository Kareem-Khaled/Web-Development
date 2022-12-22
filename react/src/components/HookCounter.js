import React, {useState} from 'react'

export default function HookCounter() {
    const [count, setCount] = useState(0);
    const add5 = () =>{
        for(let i = 0; i < 5; i++){
            setCount((prevState) => prevState + 1);
        }
    }
    return (
        <>
            <h1>Count: {count}</h1>
            <button onClick={ () => setCount(count + 1) }>+1</button>
            <button onClick={ add5 }>+5</button>
        </>
    )
}
