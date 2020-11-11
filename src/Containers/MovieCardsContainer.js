
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

class MovieCardsContainer extends Component {

    render() {
        const { classes } = this.props;

        return (

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >Movie Name</TableCell>
                            {this.props.include_genre ? (<TableCell align="right">Genre</TableCell>) : null}
                            <TableCell align="right">Popularity&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.movies.map((movie) => (
                            <TableRow key={movie.id}>
                                <TableCell component="th" scope="row">
                                    {movie.original_title}
                                </TableCell>
                                {this.props.include_genre ? (<TableCell align="right">{movie.genre_names.join()}</TableCell>) : null}
                                <TableCell align="right">{movie.popularity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
}

export default withStyles(styles)(MovieCardsContainer);