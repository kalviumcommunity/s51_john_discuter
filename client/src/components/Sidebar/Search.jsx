import React, { useState } from 'react'
import { useStore } from '../../app/store'
import { useEffect } from 'react'

const Search = () => {
  const { users, filteredUsers, setFilteredUsers } = useStore()
  const [input, setInput] = useState()
  useEffect(() => {
    if (!input)
      setFilteredUsers(users)
    else{
      setFilteredUsers(users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())))
    }
    console.log(input)
  }, [input])
  return (
    <div>
      <input 
      onChange={e => setInput(e.target.value)}
      />
    </div>
  )
}

export default Search
