import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = pageNumber *pageSize;

    return _.slice(items, startIndex, endIndex);
}