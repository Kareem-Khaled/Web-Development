import React, { forwardRef } from 'react'
import PersonList from './PersonList';

export default function Person() {
    let persons = [
        {
            id: 1,
            name: 'Kareem',
            age: 22
        },
        {
            id: 2,
            name: 'Islam',
            age: 20
        },
        {
            id: 3,
            name: 'Ahmed',
            age: 11
        }
    ];
    let msg = persons.map((person, idx) => <PersonList key = {person.id}name = {person.name} age = {person.age}></PersonList>)
    // console.log(msg)
  return (
    <div>
        {msg}
    </div>
  )
}