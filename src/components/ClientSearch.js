import React, { Component } from "react"
import * as JsSearch from "js-search"
import SearchResults from "./ClientSearchResults"

class ClientSearch extends Component {
  state = {
    isLoading: true,
    searchResults: [],
    search: null,
    isError: false,
    indexByTitle: false,
    indexByAuthor: false,
    indexByCategory: false,
    termFrequency: true,
    removeStopWords: false,
    searchQuery: "",
    selectedStrategy: "",
    selectedSanitizer: "",
  }

  /**
   * React lifecycle method that will inject the data into the state.
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.search === null) {
      const { engine } = nextProps

      return {
        indexByTitle: engine.TitleIndex,
        indexByAuthor: engine.AuthorIndex,
        indexByCategory: engine.CategoryIndex,
        termFrequency: engine.SearchByTerm,
        selectedSanitizer: engine.searchSanitizer,
        selectedStrategy: engine.indexStrategy,
      }
    }
    return null
  }

  async componentDidMount() {
    await this.rebuildIndex()
    const { search } = this.state

    if (this.props.locationsSearch) {
      const queryResult = search.search(this.props.locationsSearch)

      this.setState({
        searchQuery: this.props.locationsSearch,
        searchResults: queryResult,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.locationsSearch !== prevProps.locationsSearch) {
      const { search } = this.state
      const queryResult = search.search(this.props.locationsSearch)

      this.setState({
        searchQuery: this.props.locationsSearch,
        searchResults: queryResult,
      })
    }
  }

  /**
   * rebuilds the overall index based on the options
   */
  rebuildIndex = async () => {
    const {
      selectedStrategy,
      selectedSanitizer,
      removeStopWords,
      termFrequency,
      indexByTitle,
      indexByAuthor,
      indexByCategory,
    } = this.state

    const { posts } = this.props

    const dataToSearch = new JsSearch.Search("id")

    if (removeStopWords) {
      dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(
        dataToSearch.tokenizer
      )
    }

    /**
     * Defines an indexing strategy for the data
     * read more about it here https://github.com/bvaughn/js-search#configuring-the-index-strategy
     */
    if (selectedStrategy === "All") {
      dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy()
    }
    if (selectedStrategy === "Exact match") {
      dataToSearch.indexStrategy = new JsSearch.ExactWordIndexStrategy()
    }
    if (selectedStrategy === "Prefix match") {
      dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy()
    }

    /**
     * Defines the sanitizer for the search
     * to prevent some of the words from being excluded
     */
    selectedSanitizer === "Case Sensitive"
      ? (dataToSearch.sanitizer = new JsSearch.CaseSensitiveSanitizer())
      : (dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer())
    termFrequency === true
      ? (dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex("id"))
      : (dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex())

    // sets the index attribute for the data
    if (indexByTitle) {
      dataToSearch.addIndex("title")
    }
    // sets the index attribute for the data
    if (indexByAuthor) {
      dataToSearch.addIndex(["author", "name"])
    }

    if (indexByCategory) {
      dataToSearch.addIndex("categoriesData")
    }

    dataToSearch.addDocuments(posts) // adds the data to be searched

    this.setState({ search: dataToSearch, isLoading: false })
  }

  /**
   * handles the input change and perform a search with js-search
   * in which the results will be added to the state
   */
  searchData = e => {
    const { search } = this.state
    const queryResult = search.search(e.target.value)
    this.setState({ searchQuery: e.target.value, searchResults: queryResult })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  render() {
    const { searchResults, searchQuery } = this.state

    const queryResults = searchResults

    return (
      <>
        <h1 className="search-title">Результат поиска для: {searchQuery}</h1>
        <form className="search-form" onSubmit={this.handleSubmit}>
          <label htmlFor="Search" className="screen-reader-text">
            Введите ваш запрос
          </label>
          <input
            id="Search"
            className="search-input"
            value={searchQuery}
            onChange={this.searchData}
            placeholder="Поиск..."
            autoComplete="off" // removes the autosearch suggestions
          />
        </form>
        <SearchResults queryResults={queryResults} />
      </>
    )
  }
}

export default ClientSearch
