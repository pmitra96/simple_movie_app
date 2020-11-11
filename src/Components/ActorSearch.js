import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeApiCallForSearch,populateKnownForMovies } from "../utils/utils"
import { GENRE_URL } from "../constants"
import _ from "lodash";


class ActorSearch extends Component {
    state = {
        searchVal: ""
        
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
                    const finalResults = populateKnownForMovies(json.results)
                    
                    this.props.handleResults(finalResults)
                })
                .catch(
                    error => {
                        console.log(error)
                        this.props.handleResults([])
                    });
        }
        else{
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
                    placeholder="enter actor name"
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
export default ActorSearch;



