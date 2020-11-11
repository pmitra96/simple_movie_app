import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = {
    table: {
        minWidth: 650,
    }
};

class ActorContainer extends Component {

    state = {
        checked: 0
    }

    HandleChange = (event) => {
        const actor_id = event.target.value
        console.log(event.target.value)
        this.props.handleSelected(actor_id)
        this.setState({
            checked: actor_id
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Actor</TableCell>
                            <TableCell >Known For</TableCell>
                            <TableCell ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.actors.map((actor) => (
                            <TableRow key={actor.id}>
                                <TableCell component="th" scope="row">
                                    {actor.name}
                                </TableCell>
                                <TableCell >{actor.known_for.join()}</TableCell>
                                <TableCell >
                                    <label key={actor.id}>
                                        <input
                                            type="radio"
                                            checked={this.state.checked == actor.id ? true : false}
                                            key={actor.id}
                                            onChange={this.HandleChange}
                                            value={actor.id} />
                                    </label>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}



export default withStyles(styles)(ActorContainer);






