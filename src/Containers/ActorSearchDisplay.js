import ActorSearch from "../Components/ActorSearch";
import ActorContainer from "./ActorContainer";
import React, { Component } from "react";

class ActorSearchDisplay extends Component {

    render() {
        return (
            <div>
                <ActorSearch url={this.props.url} handleResults={this.props.handleResults} />
                <ActorContainer actors={this.props.actors} handleSelected={this.props.handleSelected}/>
            </div> 

        )
    }

}
export default ActorSearchDisplay;