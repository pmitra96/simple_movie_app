import LongMenu from "../Components/sideNav"
import React, { Component } from "react";
import { ACTOR_SEARCH_URL, MOVIE_CREDITS_URL } from '../constants'
import ActorSearchDisplay from "./ActorSearchDisplay";
import Button from '@material-ui/core/Button';
import { makeApiCallForCast, movieIntersect } from "../utils/utils";
import MovieCardsContainer from "./MovieCardsContainer";
import Grid from '@material-ui/core/Grid';

class SearchMovies extends Component {

    state = {
        actor_1_search_results: [],
        actor_2_search_results: [],
        common_movies: [],
        actor_1_selected: 0,
        actor_2_selected: 0
    }
    handleActor1Results = (results) => {
        this.setState({ actor_1_search_results: results });
    }

    handleActor2Results = (results) => {
        this.setState({ actor_2_search_results: results })
    }

    handleActors1Selected = (actor_id) => {
        this.setState({ actor_1_selected: actor_id });

    }

    handleActors2Selected = (actor_id) => {
        this.setState({ actor_2_selected: actor_id });

    }

    handleSubmit = () => {
        const Cast = makeApiCallForCast(MOVIE_CREDITS_URL, this.state.actor_1_selected)
        Cast.then(res => res.json()).catch(
            e => 
            {
                console.log("error occured while fetching movies casted for actor 1");    
                console.log(e);
            }
        ).then(json => {
                const cast1 = json.cast
                makeApiCallForCast(MOVIE_CREDITS_URL, this.state.actor_2_selected).
                    then(
                        res => res.json()
                    ).catch(
                        e => {
                            console.log("error occured while fetching movies casted for actor 2");    
                            console.log(e);
                        }
                    )
                    .then(json => {
                        const cast2 = json.cast
                        const commonMovies = movieIntersect(cast1, cast2);
                        this.setState({ common_movies: commonMovies });
                    }
                    ).catch(
                        e => {
                            console.log("error occured while finding interesecting movies");
                            console.log(e)
                        }
                    )
            }
            )
            .catch(
                error => {
                    console.log(error)
                });

    }


    render() {
        return (
            <div>
                <div style={{ textAlign: "center", marginBottom: 0 }}>
                    <h1 > Common Movies </h1>
                    <p> Search for actors and select actors with radio buttons , click on common movies to fetch all the common movies that these actors were a part of</p>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <LongMenu selected="Common Movies" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ActorSearchDisplay id = {1} key={0} url={ACTOR_SEARCH_URL} handleResults={this.handleActor1Results} actors={this.state.actor_1_search_results} handleSelected={this.handleActors1Selected} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <ActorSearchDisplay id = {2} key={1} url={ACTOR_SEARCH_URL} handleResults={this.handleActor2Results} actors={this.state.actor_2_search_results} handleSelected={this.handleActors2Selected} />
                    </Grid>
                    <Grid item xs={12} >
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                            Search for Common Movies
                    </Button>
                        <MovieCardsContainer movies={this.state.common_movies} include_genre={false} />
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default SearchMovies;


