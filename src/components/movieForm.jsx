import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
    state = {
        data: { _id: "", title: "", numberInStock: "", dailyRentalRate: "", genreId: "" },
        genres: [],
        errors: {},
    };

    schema = {
        _id: Joi.string().allow(''),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().length(24).required(),
        numberInStock: Joi.number().min(0).max(100).required().label("Number In Stock"),
        dailyRentalRate: Joi.number().min(0).max(5).required().label("Rate"),
    };

    doSubmit = () => {
        saveMovie(this.state.data);
        this.props.history.push("/movies");
    };

    componentDidMount = () => {
        const genres = getGenres();
        this.setState({ genres });

        const id = this.props.match.params.id;
        if (id === "new") return;

        const movie = getMovie(id);
        if (!movie) return this.props.history.replace("/not-found");

        this.setState({ data: this.mapToViewModel(movie) });
    };

    mapToViewModel = (movie) => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        };
    };

    render() {
        const { data, genres } = this.state;
        return (
            <div>
                <h1>New Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    <input name="_id" type="hidden" value={data._id} />
                    {this.renderInput("title", "Title", this.handleChange, "text", true)}
                    {this.renderDropdown("genreId", "Genre", genres, data.genreId, "Pick a genre")}
                    {this.renderInput("numberInStock", "Number In Stock", this.handleChange, "number")}
                    {this.renderInput("dailyRentalRate", "Rate", this.handleChange, "number")}

                    {this.renderButton(data._id ? "Edit Movie" : "Add Movie")}
                </form>
            </div>
        );
    }
}

export default MovieForm;
