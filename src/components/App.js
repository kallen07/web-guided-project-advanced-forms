import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Friend from './Friend'
import FriendForm from './FriendForm'
import FormSchema from '../validation/formSchema'
import * as Yup from 'yup'

//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: '',
  email: '',
  ///// DROPDOWN /////
  role: '',
  ///// RADIO BUTTONS /////
  civil: '',
  ///// CHECKBOXES /////
  hiking: false,
  reading: false,
  coding: false,
}
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialFriends = []
const initialDisabled = true


export default function App() {
  //////////////// STATES ////////////////
  const [friends, setFriends] = useState(initialFriends)          // array of friend objects
  const [formValues, setFormValues] = useState(initialFormValues) // object
  const [formErrors, setFormErrors] = useState(initialFormErrors) // object
  const [disabled, setDisabled] = useState(initialDisabled)       // boolean

  //////////////// HELPERS ////////////////
  const getFriends = () => {
    axios.get("http://buddies.com/api/friends")
      .then(res => {
        console.log(res.data)
        setFriends(res.data)
      })
      .catch(err => console.log(err))
  }

  const postNewFriend = newFriend => {
    axios.post("http://buddies.com/api/friends", newFriend)
      .then(res => {
        console.log(res.data)
        setFriends([...friends, res.data])
        setFormValues(initialFormValues)
      })
  }

  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
    Yup.reach(FormSchema, name)
      .validate(value)
        .then(() => setFormErrors({...formErrors, [name]: ''}))
        .catch(err => setFormErrors({...formErrors, [name]: err.errors[0]}))
  
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      hobbies: ["hiking", "reading", "coding"].filter(hobby => !!formValues[hobby])
    }
    postNewFriend(newFriend)
  }

  //////////////// SIDE EFFECTS ////////////////
  // TODO

  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    FormSchema.isValid(formValues)
      .then(isValid => setDisabled(!isValid))
      .catch(err => console.log(err))
  }, [formValues]);

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <FriendForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />

      {
        friends.map(friend => {
          return (
            <Friend key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
