import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from 'lodash';

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: null,
        pageSize: 4,
        currentPage: 1,
        sortColumn: {column: 'title', order: 'asc'}
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

    getPagedData = () => {
        const { selectedGenre, sortColumn } = this.state;

        const filtered = selectedGenre && selectedGenre._id ? this.state.movies.filter((movie) => {
            return movie.genre._id === selectedGenre._id;
        }): this.state.movies;

        const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

        const movies = paginate(
            sorted,
            this.state.currentPage,
            this.state.pageSize
        );

        return {data: movies, totalCount: filtered.length};
    }
    renderTable = () => {
        const { pageSize, currentPage } = this.state;
        const { totalCount, data: movies} = this.getPagedData();

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
                        <h3>There are {totalCount} movies in DB</h3>
                        <MoviesTable 
                            movies={movies}
                            sortColumn={this.state.sortColumn}
                            onLike={this.handleLike}
                            onDelete={this.handleDelete}
                            onSort={this.handleSort}
                        />
                        <Pagination
                            itemsCount={totalCount}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    };

    handleDelete = (id) => {
        deleteMovie(id);
        this.setState({ movies: getMovies() });
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index].like = !movies[index].like;
        console.log( movies);

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

    handleSort = (sortColumn) => {
        this.setState({sortColumn});
    }
}

export default Movies;
