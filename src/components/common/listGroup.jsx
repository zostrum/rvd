import React, { Component } from "react";
import PropTypes from "prop-types";

class ListGroup extends Component {
    render() {
        const {items, textProperty, valueProperty, selectedItem} = this.props;
        return (
            <div className="list-group">
                {items.map((item) => (
                    <button
                        key={item[valueProperty]}
                        className={ item === selectedItem 
                            ? "list-group-item list-group-item-action active " 
                            : "list-group-item list-group-item-action"}
                        onClick={() => this.props.onFilter(item)}
                    >
                        {item[textProperty]}
                    </button>
                ))}
            </div>
        );
    }

    resetFilter = () => {};
}

// ListGroup.propTypes = {
//     genres: PropTypes.array.isRequired,
// };

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;
