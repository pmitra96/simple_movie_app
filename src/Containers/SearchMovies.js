/* eslint react/prop-types: 0 */
import LongMenu from "../Components/sideNav"
import React, { Component } from "react";
import APISearch from "../Components/APISearch";
import { MOVIE_SEARCH_URL } from '../constants'
import MovieCardsContainer from "./MovieCardsContainer";


class SearchMovies extends Component {

    state = {
        movies: []
    }
    handleResults = (results) => {
        this.setState({ movies: results });
    }

    render() {
        return (
            
            <div>
                <LongMenu selected="Search Movies" />
                <div style={{ textAlign: "center", marginBottom: 0 }}>
                    <h1 > Search Movies </h1>
                    <p> Search for your favourite movie</p>
                    
                    <APISearch url={MOVIE_SEARCH_URL} handleResults={this.handleResults} />
                    <MovieCardsContainer movies={this.state.movies} include_genre={true} />
                </div>
                
                
            </div>
        );
    }
}
export default SearchMovies;