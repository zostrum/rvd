import "./App.css";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notfound";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/common/navbar";

class App extends Component {
    state = {};
    render() {
        return (
            <main className="container">
                <Navbar />
                <Switch>
                    <Route path="/movies/:id" component={MovieForm} />
                    <Route path="/movies" component={Movies} />
                    <Route path="/customers" component={Customers} />
                    <Route path="/rentals" component={Rentals} />
                    <Route path="/not-found" component={NotFound} />
                    <Redirect exact from="/" to="/movies" />
                    <Redirect to="/not-found" />
                </Switch>
            </main>
        );
    }
}

export default App;
