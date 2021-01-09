import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import authService from "../services/authService";
class RegisterForm extends Form {
    state = {
        data: { username: "", password: "", name: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.string().min(5).required().label("Password"),
        name: Joi.string().required().label("Name"),
    };

    doSubmit = async () => {
        try {
            
            const resp = await userService.register(this.state.data);
            authService.loginWithJwt(resp.headers['x-auth-token']);
            window.location = "/";
        } catch (error) {
            if (error.response && error.response.status === 400) {
                const errors = { ...this.state.errors };
                errors.username = error.response.data;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <div>
                <h1>LoginForm</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput("username", "Username", this.handleChange, "text", true)}
                    {this.renderInput("password", "Password", this.handleChange, "password")}
                    {this.renderInput("name", "Name", this.handleChange)}
                    {this.renderButton("Register")}
                </form>
            </div>
        );
    }
}

export default RegisterForm;
