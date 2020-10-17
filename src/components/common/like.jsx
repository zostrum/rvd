import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart} from '@fortawesome/free-regular-svg-icons';

import { library } from "@fortawesome/fontawesome-svg-core";
library.add(fasHeart, farHeart);

class Like extends Component {
    render() {

        return (
            <button className="btn btn-link" onClick={this.props.onClick}>
                {/* <FontAwesomeIcon icon={["fas","heart"]} /> */}
                <FontAwesomeIcon icon={[ this.parseLike(), "heart"]} />
            </button>
        );
    }

    parseLike = () => {
        return this.props.like === true ? "fas" : "far";
    }

}


export default Like;
