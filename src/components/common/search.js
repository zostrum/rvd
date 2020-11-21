import React, { Component } from "react";

class SearchBox extends Component {
    render() {
        const { value, onChange } = this.props;

        return (
            <input
                type="text"
                onChange={e => onChange(e.currentTarget.value)}
                name="search"
                id="search"
                className="form-control my-3"
                placeholder="search.."
                value={value}
            />
        );
    }
}

export default SearchBox;
