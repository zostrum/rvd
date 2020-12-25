import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
    columns = [
        { path: "title", label: "Title", content: (movie) => <Link to={`/movies/${movie._id}`}>{movie.title}</Link> },
        { path: "genre.name", label: "Genre" },
        { path: "numberInStock", label: "Stock" },
        { path: "dailyRentalRate", label: "Rate" },
        {
            key: "like",
            content: (movie) => <Like like={movie.like} onClick={() => this.props.onLike(movie)} />,
            label: "Like",
        },
        {
            key: "delete",
            content: (movie) => (
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        this.props.onDelete(movie);
                    }}>
                    Delete
                </button>
            ),
        },
    ];

    render() {
        const { movies, sortColumn, onSort } = this.props;
        
        return (
            <div>
                <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />
            </div>
        );
    }
}

export default MoviesTable;
