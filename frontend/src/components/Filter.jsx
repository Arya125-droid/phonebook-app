import React from 'react'

const Filter = ({ searchName, handleSearch }) => {
  return (
    <div>
      filter shown with <input onChange={handleSearch} value={searchName} />
    </div>
  )
}

export default Filter