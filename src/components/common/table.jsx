import React, { Component } from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";

class Table extends Component {
    render() {
        const { columns, sortColumn, onSort, data } = this.props;

        return (
            <table className="col-9 table">
                <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
                <TableBody data={data} columns={columns} />
            </table>
        );
    }
}

export default Table;
