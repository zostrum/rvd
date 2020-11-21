import React, { Component } from "react";

class DropDown extends Component {
    render() {
        const { name, label, onChange, error, options, currentItem, defaultMessage } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <select className="form-control" name={name} id={name} onChange={onChange}>
                    <option value="" hidden>
                        {defaultMessage}
                    </option>
                    {options.map((option) => (
                        <option key={option._id} value={option._id} selected={currentItem === option._id ? "selected"  : ""}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>
        );
    }
}

export default DropDown;