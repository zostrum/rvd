import "./App.css";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notfound";
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
    state = {};
    render() {
        return (
            <main className="container">
                <ToastContainer />
                <Navbar />
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/register" component={RegisterForm} />
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
