import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notfound";
import Navbar from "./components/common/navbar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import authService from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
    state = {};

    componentDidMount() {
        const user = authService.getCurrentUser();
        this.setState({ user });
    }

    render() {
        return (
            <main className="container">
                <ToastContainer />
                <Navbar user={this.state.user} />
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={RegisterForm} />

                    <ProtectedRoute path="/movies/:id" component={MovieForm}></ProtectedRoute>

                    <Route path="/movies" render={(props) => <Movies {...props} user={this.state.user} />} />
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
