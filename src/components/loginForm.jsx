import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import authService from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = async () => {
        try {
            const { data } = this.state;
            await authService.login(data.username, data.password);

            const { state } = this.props.location;
            window.location = state ? state.from.pathname : "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = error.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        if (authService.getCurrentUser()) return <Redirect to="/" />;

        return (
            <div>
                <h1>LoginForm</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", this.handleChange, "text", true)}
                    {this.renderInput("password", "Password", this.handleChange, "password")}
                    {this.renderButton("Login")}
                </form>
            </div>
        );
    }
}

export default LoginForm;
