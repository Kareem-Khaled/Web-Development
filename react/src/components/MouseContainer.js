import React, {useState} from 'react'
import HookEffect from './HookEffect';

export default function MouseContainer() {
  const [display, setDisplay] = useState(true);
  return (
        <>
            {display && <HookEffect />}
            <button onClick={() => setDisplay(!display)}>Toggle disp</button>
        </> 
    )
}
