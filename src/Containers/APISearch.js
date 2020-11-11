import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeApiCallForSearch, makeGetApiCall, populateGenres } from "../utils/utils"
import { GENRE_URL } from "../constants"
import _ from "lodash";



class APISearch extends Component {
    state = {
        searchVal: "",
        genreMap: {}
    }
    componentDidMount() {
        const genrePromise = makeGetApiCall(GENRE_URL);
        genrePromise.then(
            res => res.json()
        ).then(
            json => {
                console.log(json);
                return json["genres"]

            }).then(
                genres => {
                    const genreIdToNameMap = _.fromPairs(genres.map(genre => [genre.id, genre.name]));
                    this.setState({ genreMap: genreIdToNameMap })
                }
            ).catch(
                e => {
                    console.log(e);
                }
            )
    }
    handleOnChange = event => {
        console.log(event.target.value);
        this.setState({ searchVal: event.target.value });
    };
    handleSubmit = () => {
        if (this.state.searchVal != "") {
            const url = this.props.url
            console.log(this.state.searchVal);
            const searchPromise = makeApiCallForSearch(this.state.searchVal, url)
            searchPromise.then(res => res.json())
                .then(json => {
                    console.log(json.results);
                    const finalResults = populateGenres(json.results, this.state.genreMap)
                    this.props.handleResults(finalResults)
                })
                .catch(
                    error => {
                        console.log(error)
                        this.props.handleResults([])
                    });
        }
        else {
            this.props.handleResults([])
        }
    }
    render() {

        return (
            <div>
                <TextField
                    value={this.state.searchVal}
                    id="standard-full-width"
                    style={{ margin: 8 }}
                    placeholder="enter movie name to search"
                    fullWidth
                    margin="normal"
                    onChange={this.handleOnChange}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                    SEARCH
                </Button>

            </div>
        );
    }
}
export default APISearch;



