import React, { useState, useRef } from "react"
import { navigate } from "gatsby"

const SearchNavForm = () => {
  const [query, setQuery] = useState("")
  const inputEl = useRef(null)

  const handleChange = e => {
    setQuery(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const q = inputEl.current.value
    navigate(`/search?q=${q}`)
  }

  return (
    <form role="search" onSubmit={handleSubmit} className="serchNavForm">
      <div className="serchNavForm__line">
        <input
          ref={inputEl}
          id="search-input"
          type="search"
          value={query}
          placeholder="Поиск..."
          onChange={handleChange}
        />
        <button type="submit" className="btn-primary">
          <i className="fas fa-search"></i>
        </button>
      </div>
    </form>
  )
}

export default SearchNavForm
