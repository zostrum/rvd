import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

class Pagination extends Component {
    render() {
        const pages = _.range(1, this.getPagesCount() + 1);
        if (pages.length === 1) return null;
        const { currentPage, onPageChange } = this.props;

        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pages.map((page) => {
                        return (
                            <li
                                key={page}
                                className={
                                    page === currentPage
                                        ? "page-item active"
                                        : "page-item"
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <Link
                                    className="page-link"
                                    onClick={() => onPageChange(page)}
                                    to="#"
                                >
                                    {page}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        );
    }

    getPagesCount = () => {
        const { itemsCount, pageSize } = this.props;

        return itemsCount / pageSize;
    };
}

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;
