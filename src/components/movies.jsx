import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: null,
        pageSize: 4,
        currentPage: 1,
    };

    componentDidMount() {
        const genres = [{name: "All genres", _id: 0}, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres: genres,
        })
    }

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
        const { pageSize, currentPage, selectedGenre } = this.state;
        const filtered = selectedGenre && selectedGenre._id ? this.state.movies.filter((movie) => {
            return movie.genre._id === selectedGenre._id;
        }): this.state.movies;

        const movies = paginate(
            filtered,
            this.state.currentPage,
            this.state.pageSize
        );


        return (
            <div className="container tableComponent">
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={this.state.genres}
                            onFilter={(genre) => this.handleFilter(genre)}
                            onFilterReset={this.handleFilterReset}
                            selectedItem={this.state.selectedGenre}
                        />
                    </div>
                    <div className="col">
                        <h3>There are {filtered.length} movies in DB</h3>
                        <table className="col-9 table">
                            <thead>
                                <tr>
                                    <th scope="col">title</th>
                                    <th scope="col">genre</th>
                                    <th scope="col">numberInStock</th>
                                    <th scope="col">dailyRentalRate</th>
                                    <th scope="col">Like</th>
                                </tr>
                            </thead>
                            <tbody>
                                { movies.map((movie) => {
                                    const { _id, title, numberInStock, dailyRentalRate, like } = movie;

                                    return (
                                        <tr key={_id}>
                                            <td>{title}</td>
                                            <td>{movie.genre.name}</td>
                                            <td>{numberInStock}</td>
                                            <td>{dailyRentalRate}</td>
                                            <td>
                                                <Like
                                                    id={_id}
                                                    like={like}
                                                    onClick={() => this.handleLike(movie)}
                                                />
                                            </td>
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
                                    )}
                                )}
                            </tbody>
                        </table>
                        <Pagination
                            itemsCount={filtered.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    };

    handleDeleteMovie = (id) => {
        deleteMovie(id);
        this.setState({ movies: getMovies() });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].like = !movies[index].like;

        this.setState({ movies });
    };

    handlePageChange = (page) => {
        this.setState({ currentPage: page });
    };

    handleFilter = (genre) => {
        this.setState({
            currentPage: 1,
            selectedGenre: genre,
        });
    };

    handleFilterReset = () => {
        this.setState({movies: getMovies()})
    } 
}

export default Movies;
