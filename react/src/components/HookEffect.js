import React, {useState, useEffect} from 'react'

export default function HookEffect() {
    const [name, setName] = useState('');
    const [count, setCount] = useState(0);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    useEffect(() =>{
        console.log('useEffect')
        document.title = `Clicked ${count} time`;
    }, [count])
    // [count]: only change if the count changed
    
    const logPos = e =>{
        console.log('mouse event');
        setX(e.clientX);
        setY(e.clientY);
    }

    useEffect(() =>{
        window.addEventListener('mousemove', logPos);
        return () =>{
            console.log('remove event done')
            window.removeEventListener('mousemove', logPos);
        }
    },[])
    // []: run for the first time only
    // return: to clear the event
    return (
        <>
            <h1>X - {x}, Y - {y}</h1>
            <input type="text" value = {name} onChange = {e => setName(e.target.value)}></input>
            <button onClick={() => setCount(pre => pre + 1)}>Click {count} time</button>
        </>
  )
}
