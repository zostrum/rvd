import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { Link } from "react-router-dom";

import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/search";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        selectedGenre: null,
        pageSize: 4,
        currentPage: 1,
        sortColumn: { column: "title", order: "asc" },
        searchQuery: "",
    };

    componentDidMount() {
        const genres = [{ name: "All genres", _id: 0 }, ...getGenres()];
        this.setState({
            movies: getMovies(),
            genres: genres,
        });
    }

    render() {
        return <div>{this.showTable()}</div>;
    }

    showTable = () => {
        return this.state.movies.length === 0 ? <h2>No movies</h2> : this.renderTable();
    };

    getPagedData = () => {
        const { selectedGenre, sortColumn, searchQuery, movies: allMovies } = this.state;

        let filtered = allMovies;
        if (searchQuery) {
            filtered = allMovies.filter((movie) => {
                return movie.title.toLowerCase().includes(searchQuery.toLowerCase());
            });
        } else if (selectedGenre && selectedGenre._id) {
            filtered =
                selectedGenre && selectedGenre._id
                    ? this.state.movies.filter((movie) => {
                          return movie.genre._id === selectedGenre._id;
                      })
                    : this.state.movies;
        }

        const sorted = _.orderBy(filtered, [sortColumn.column], [sortColumn.order]);

        const movies = paginate(sorted, this.state.currentPage, this.state.pageSize);

        return { data: movies, totalCount: filtered.length };
    };
    renderTable = () => {
        const { pageSize, currentPage, searchQuery } = this.state;
        const { totalCount, data: movies } = this.getPagedData();

        return (
            <div className="container tableComponent">
                <div className="row">
                    <div className="col-3">
                        <ListGroup
                            items={this.state.genres}
                            onFilter={(genre) => this.handleFilter(genre)}
                            selectedItem={this.state.selectedGenre}
                        />
                    </div>
                    <div className="col">
                        <Link to="/movies/new" className="btn btn-primary">
                            New Movie
                        </Link>
                        <SearchBox value={searchQuery} onChange={this.handleSearch} />
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

    handleSearch = (query) => {
        this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });

        // const movies = [...this.state.movies];
        // const searchString = input.value.toLowerCase();

        // const filteredMovies = movies.filter((movie) => {
        //     const title = movie.title.toLowerCase();
        //     return title.includes(searchString);
        // });

        // this.setState({ movies: filteredMovies, selectedGenre: null, currentPage: 1 });
    };

    handleDelete = (id) => {
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
            searchQuery: "",
        });
    };

    handleSort = (sortColumn) => {
        this.setState({ sortColumn });
    };
}

export default Movies;
