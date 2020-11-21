import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

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

    doSubmit = () => {
        console.log("Registred");
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
