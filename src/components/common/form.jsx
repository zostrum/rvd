import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Dropdown from "./dropdown";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const options = { abortEarly: false };

        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value };
        const { error } = Joi.validate(obj, { [name]: this.schema[name] });

        return error ? error.details[0].message : null;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validate();
        this.setState(errors || {});
        if (errors) return;

        this.doSubmit(this.state);
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    renderButton = (label) => {
        return (
            <button disabled={!!this.validate()} className="btn btn-primary">
                {label}
            </button>
        );
    };

    renderDropdown = (name, label, options, currentItem, defaultMessage) => {
        const { data, errors } = this.state;

        return (
            <Dropdown
                name={name}
                label={label}
                onChange={this.handleChange}
                data={data[name]}
                error={errors[name]}
                defaultMessage={defaultMessage}
                options={options}
                currentItem={currentItem}
            />
        );
    };

    renderInput = (name, label, onChange, type = "text", autoFocus = false) => {
        const { data, errors } = this.state;

        return (
            <Input
                name={name}
                label={label}
                value={data[name]}
                onChange={onChange}
                error={errors[name]}
                autoFocus={autoFocus}
                type={type}
            />
        );
    };
}

export default Form;
