import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class LoginForm extends Form {
    state = {
        data: { username: "", password: "" },
        errors: {},
    };

    schema = {
        username: Joi.string().required().label("Username"),
        password: Joi.string().required().label("Password"),
    };

    doSubmit = () => {
        console.log("submitted");
    };

    render() {
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
