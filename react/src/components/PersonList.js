import React from 'react'
import styles from './Style.module.css'

export default function PersonList(props) {
    const {name, age} = props;
    return (
    <h1 className={styles.danger}>My name is {name}, and I'm {age} years old.</h1>
  )
}
