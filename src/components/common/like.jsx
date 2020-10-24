import React, { Component } from "react";

class Like extends Component {
    render() {

        return (
            <button className="btn btn-link" onClick={this.props.onClick}>
                <i className={this.parseLike()}></i>
            </button>
        );
    }

    parseLike = () => {
        return this.props.like === true ? "fa fa-heart" : "fa fa-heart-o";
    }

}


export default Like;
