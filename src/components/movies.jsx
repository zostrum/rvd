import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";

class Movies extends Component {
    constructor() {
        super();
        this.state.movies = getMovies();
    }

    state = {};

    render() {
        return <div>{this.showTable()}</div>;
    }

    showTable = () => {
        return this.state.movies.length === 0 ? (
            <h2>No movies</h2>
        ) : (
            this.renderTable()
        );
    };

    renderTable = () => {
        return (
            <div className="tableComponent">
                <h3>There are {this.state.movies.length} movies in DB</h3>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">title</th>
                            <th scope="col">genre</th>
                            <th scope="col">numberInStock</th>
                            <th scope="col">dailyRentalRate</th>
                        </tr>
                    </thead>
                    <tbody>{this.fillTable()}</tbody>
                </table>
            </div>
        );
    };

    fillTable = () => {
        return (
            this.state.movies.map((movie) => {
                return (
                    <tr key={movie._id}>
                        <td>{movie.title}</td>
                        <td>{movie.genre.name}</td>
                        <td>{movie.numberInStock}</td>
                        <td>{movie.dailyRentalRate}</td>
                        <td>
                            <button
                                className="btn btn-danger"
                                onClick={() => {
                                    this.handleDeleteMovie(movie._id);
                                }}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                );
            })
        );
    };

    handleDeleteMovie = (id) => {
        let movie = deleteMovie(id)
        this.setState({ movies: getMovies() })
    };
}

export default Movies;
