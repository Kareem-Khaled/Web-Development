import React, { forwardRef } from 'react'

const InputRef = forwardRef((props, ref) =>{
    return (
        <input type='text' ref = {ref}></input>
    )
}) 

export default InputRef;