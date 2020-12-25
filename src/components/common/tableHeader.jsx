import React, { Component } from 'react';

class TableHeader extends Component {
    raiseSort = column => {
        const sortColumn = {...this.props.sortColumn};
        if (sortColumn.column === column) {
            sortColumn.order = (sortColumn.order === 'asc' ? 'desc' : 'asc');
        } else {
            sortColumn.column = column;
        }
        this.props.onSort(sortColumn);
    }

    renderSortIcon = (column) => {
        const {sortColumn} = this.props;
        
        if (column.path !== sortColumn.column) return null;
        if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"/>;

        return <i className="fa fa-sort-desc"/>
    }

    render() { 
        const { columns } = this.props;

        return ( 
            <thead>
                <tr>
                    { columns.map((column) => {
                        return (
                            <th className="clickable" scope="col" onClick={() => this.raiseSort(column.path)} key={column.path || column.key}>
                                {column.label} {this.renderSortIcon(column)}
                            </th>
                        );
                    })}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;