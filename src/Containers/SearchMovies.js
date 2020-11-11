import LongMenu from "../Components/sideNav"
import React, { Component } from "react";
import APISearch from "../Components/APISearch";
import {MOVIE_SEARCH_URL} from '../constants'
import MovieCardsContainer from "./MovieCardsContainer";


class SearchMovies extends Component {

    state = {
        movies : []
    }
    handleResults = (results) => {
        this.setState({movies : results});
    }

    render() {
      return (
        <div>
          <LongMenu selected= "Search Movies" />
          <APISearch url =  {MOVIE_SEARCH_URL} handleResults = {this.handleResults}/>
          <MovieCardsContainer movies = {this.state.movies} include_genre = {true}/>
        </div>
      );
    }
  }
  export default SearchMovies;