import React, { useState } from 'react'
import { useStore } from '../../app/store'
import { useEffect } from 'react'

const Search = () => {
  const { users, filteredUsers, setFilteredUsers } = useStore()
  const [input, setInput] = useState()
  useEffect(() => {
    if (!input)
      setFilteredUsers(users)
    else {
      setFilteredUsers(users.filter((user) => user.fullName.toLowerCase().includes(input.toLowerCase())))
    }
    console.log(input)
  }, [input])
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" 
        className="grow" 
        onChange={e => setInput(e.target.value)}
        placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd" />
        </svg>
      </label>
    </div>
  )
}

export default Search
